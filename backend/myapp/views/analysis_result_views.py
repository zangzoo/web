from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import numpy as np
from django.conf import settings
from pathlib import Path
from myapp.model import PatientImage
from ..utils import load_custom_model, load_label_map, predict_image

class PredictView(View):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Load the model and label map
        model_structure_path = Path(settings.BASE_DIR) / 'myapp/model/model.json'
        model_weights_path = Path(settings.BASE_DIR) / 'myapp/model/model_weights.h5'
        label_map_path = Path(settings.BASE_DIR) / 'myapp/model/label_map_1.json'
        self.model = load_custom_model(model_structure_path, model_weights_path)
        self.label_map = load_label_map(label_map_path)

    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        # Example context data to render the template
        context = {
            'status': '',
            'predictions': [],
            'predicted_class_index': None,
            'predicted_class_name': '',
            'image_id': None
        }
        return render(request, 'myapp/analysis_result.html', context)

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

        context = {
            'status': 'success',
            'predictions': predictions.tolist(),
            'predicted_class_index': predicted_class_index,
            'predicted_class_name': predicted_class_name,
            'image_id': image_id
        }

        return render(request, 'myapp/analysis_result.html', context)
