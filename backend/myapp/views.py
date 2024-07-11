from django.shortcuts import render
from django.http import JsonResponse
from .forms import ImageUploadForm
from .models import PatientImage
from django.views import View
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import numpy as np
import os
from django.conf import settings
from pathlib import Path
from .utils import load_custom_model, load_label_map, predict_image

class PredictView(View):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Load the model and label map
        model_structure_path = Path(settings.BASE_DIR) / 'myapp/model/model.json'
        model_weights_path = Path(settings.BASE_DIR) / 'myapp/model/model_weights.h5'
        label_map_path = Path(settings.BASE_DIR) / 'myapp/model/label_map_1.json'
        self.model = load_custom_model(model_structure_path, model_weights_path)
        self.label_map = load_label_map(label_map_path)

    # def __init__(self, **kwargs):
    #     super().__init__(**kwargs)
    #     # Load the model and label map
    #     model_path = Path(settings.BASE_DIR) / 'myapp/model/complete_model.keras'
    #     label_map_path = Path(settings.BASE_DIR) / 'myapp/model/label_map_1.json'
    #     self.model = load_custom_model(model_path)
    #     self.label_map = load_label_map(label_map_path)

    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request):
        image_id = request.POST.get('image_id')
        if not image_id:
            return JsonResponse({'error': 'No image ID provided'}, status=400)

        image = get_object_or_404(PatientImage, id=image_id)
        image_path = image.image.path  # 이미지 파일 경로

        # Perform image prediction
        predictions = predict_image(self.model, image_path)
        if predictions is None:
            return JsonResponse({'error': 'Model inference failed'}, status=500)

        predicted_class_index = int(np.argmax(predictions[0]))
        predicted_class_name = self.label_map[str(predicted_class_index)]

        return JsonResponse({
            'status': 'success',
            'predictions': predictions.tolist(),
            'predicted_class_index': predicted_class_index,
            'predicted_class_name': predicted_class_name
        })

@csrf_exempt
def upload_image(request):
    if request.method == 'POST':
        form = ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
            image_instance = form.save()
            # 업로드된 이미지의 URL을 반환
            image_url = request.build_absolute_uri(image_instance.image.url)
            return JsonResponse({
                'status': 'success',
                'message': 'Image uploaded successfully',
                'image_id': image_instance.id,
                'image_url': image_url  # 업로드된 이미지의 URL 반환
            })
        else:
            return JsonResponse({
                'status': 'error',
                'message': 'Failed to upload image',
                'errors': form.errors
            })
    else:
        form = ImageUploadForm()
        return render(request, 'myapp/upload.html', {'form': form})
