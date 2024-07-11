# backend/myapp/utils.py

import json
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import model_from_json, Sequential
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.utils import get_custom_objects
from tensorflow.keras.saving import register_keras_serializable

# 필요한 Keras 클래스 등록
@register_keras_serializable(package='Custom', name='CustomSequential')
class CustomSequential(tf.keras.Sequential):
    pass

get_custom_objects().update({
    "CustomSequential": CustomSequential,
    "Sequential": tf.keras.Sequential,
})

def load_custom_model(model_structure_path, model_weights_path):
    with open(model_structure_path, 'r') as f:
        model_json = f.read()
    model = model_from_json(model_json, custom_objects={"CustomSequential": CustomSequential})
    model.load_weights(model_weights_path)
    return model

# def load_custom_model(model_path):
#     model = load_model(model_path, custom_objects={"CustomSequential": CustomSequential})
#     return model

def load_label_map(label_map_path):
    with open(label_map_path, 'r') as f:
        label_map = json.load(f)
    return label_map

def predict_image(model, image_path):
    try:
        img = load_img(image_path, target_size=(224, 224))
        img_array = img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        predictions = model.predict(img_array)
        return predictions
    except Exception as e:
        print(f"Error in prediction: {e}")
        return None