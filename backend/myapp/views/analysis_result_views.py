from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import numpy as np
from django.conf import settings
from pathlib import Path
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
        # URL 파라미터에서 이미지 URL과 예측 결과를 가져오기
        image_url = request.GET.get('image_url')
        predicted_label = request.GET.get('predicted_label')
        confidence_score = request.GET.get('confidence_score')

        context = {
            'image_url': image_url,
            'predicted_label': predicted_label,
            'confidence_score': confidence_score,
        }

        return render(request, 'myapp/analysis_result.html', context)

    def post(self, request):
        # image_id 대신 image_url을 사용하여 예측 수행
        image_url = request.POST.get('image_url')
        if not image_url:
            return JsonResponse({'error': 'No image URL provided'}, status=400)

        image_path = settings.MEDIA_ROOT + image_url.split(settings.MEDIA_URL)[-1]

        # Perform image prediction
        predictions = predict_image(self.model, image_path)
        if predictions is None:
            return JsonResponse({'error': 'Model inference failed'}, status=500)

        predicted_label = self.label_map[str(np.argmax(predictions[0]))]
        confidence_score = float(np.max(predictions[0]))

        context = {
            'status': 'success',
            'predictions': predictions.tolist(),
            'predicted_label': predicted_label,
            'confidence_score': confidence_score,
            'image_url': image_url
        }

        return render(request, 'myapp/analysis_result.html', context)
