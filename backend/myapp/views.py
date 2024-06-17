from django.shortcuts import render

# Create your views here.

import json
import os
import numpy as np
import requests
import tensorflow as tf
from django.http import JsonResponse
from django.views import View
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

# Create your views here.


@method_decorator(csrf_exempt, name='dispatch')
class PredictView(View):
    def post(self, request):
        image_url = request.POST.get('url')
        if not image_url:
            return JsonResponse({'error': 'No URL provided'}, status=400)

        # 이미지 다운로드
        image_path = self.download_image(image_url)
        if not image_path:
            return JsonResponse({'error': 'Failed to download image'}, status=400)

        # 모델 추론
        predictions = self.mock_predict_image(image_path) # 예시
        # predictions = self.predict_image(image_path)
        if predictions is None:
            return JsonResponse({'error': 'Model inference failed'}, status=500)

        # 가장 높은 확률 값을 가진 클래스 인덱스를 찾음
        predicted_class_index = int(np.argmax(predictions[0]))

        # 클래스 인덱스를 클래스 이름으로 변환
        label_map = self.mock_load_label_map() # 예시
        # label_map = load_label_map()
        predicted_class_name = label_map[str(predicted_class_index)]

        return JsonResponse({
            'predictions': predictions.tolist(),
            'predicted_class_index': predicted_class_index,
            'predicted_class_name': predicted_class_name
        })

    def download_image(self, url):
        try:
            response = requests.get(url)
            response.raise_for_status()
        except requests.RequestException as e:
            print(f"Error downloading image: {e}")
            return None

        image_path = os.path.join(settings.MEDIA_ROOT, 'temp_image.jpg')
        with open(image_path, 'wb') as f:
            f.write(response.content)
        return image_path

    def mock_predict_image(self, image_path):
        try:
            # 임시 예측 결과 생성
            predictions = np.array([[0.1, 0.7, 0.2]])  # 예시 데이터
            return predictions
        except Exception as e:
            print(f"Error during model inference: {e}")
            return None

    # def predict_image(self, image_path):
    #     try:
    #         model = tf.keras.models.load_model(os.path.join(settings.MODEL_ROOT, 'your_model.h5'))
    #         image = load_img(image_path, target_size=(224, 224))
    #         image = img_to_array(image) / 255.0
    #         image = tf.expand_dims(image, 0)
    #         predictions = model.predict(image)
    #         return predictions
    #     except Exception as e:
    #         print(f"Error during model inference: {e}")
    #         return None

    def mock_load_label_map(self):
        # 임시 라벨 맵 생성
        label_map = {
            "0": "Class A",
            "1": "Class B",
            "2": "Class C"
        }
        return label_map

# def load_label_map():
#     base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
#     label_map_path = os.path.join(base_dir, 'myproject', 'models', 'label_map.json')
#
#     with open(label_map_path, 'r') as file:
#         label_map = json.load(file)
#
#     return label_map