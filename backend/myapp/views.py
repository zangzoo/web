from django.shortcuts import render
from django.http import JsonResponse
from .forms import ImageUploadForm
from .models import PatientImage
from django.views import View
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import PatientImage
import numpy as np
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name='dispatch')
class PredictView(View):
    def post(self, request):
        image_id = request.POST.get('image_id')
        if not image_id:
            return JsonResponse({'error': 'No image ID provided'}, status=400)

        image = get_object_or_404(PatientImage, id=image_id)
        image_path = image.image.path  # 이미지 파일 경로

        # 이미지 분석 로직 수행 (여기서는 임시 결과 생성)
        predictions = self.mock_predict_image(image_path)
        if predictions is None:
            return JsonResponse({'error': 'Model inference failed'}, status=500)

        predicted_class_index = int(np.argmax(predictions[0]))
        predicted_class_name = self.mock_load_label_map()[str(predicted_class_index)]


        return JsonResponse({
            'status': 'success',
            'predictions': predictions.tolist(),
            'predicted_class_index': predicted_class_index,
            'predicted_class_name': predicted_class_name
        })

    def mock_predict_image(self, image_path):
        # 임시 예측 결과 생성
        return np.array([[0.1, 0.7, 0.2]])  # 예시 데이터

    def mock_load_label_map(self):
        # 임시 라벨 맵 생성
        return {"0": "Class A", "1": "Class B", "2": "Class C"}

@csrf_exempt
def upload_image(request):
    if request.method == 'POST':
        form = ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
            image_instance = form.save()
            # 업로드된 이미지의 ID를 반환
            return JsonResponse({
                'status': 'success',
                'message': 'Image uploaded successfully',
                'image_id': image_instance.id  # 업로드된 이미지의 ID 반환
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