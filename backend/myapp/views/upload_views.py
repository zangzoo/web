from django.shortcuts import render, redirect
from django.http import JsonResponse
from myapp.forms import ImageUploadForm
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from myapp.utils import load_custom_model, load_label_map, predict_image
from pathlib import Path
import numpy as np
from myapp.models import MRIImage, Patient


@csrf_exempt
def upload_image(request):
    if request.method == 'POST':
        form = ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
            patient_id = request.POST.get('patient_id')
            print(f"Received patient_id: {patient_id}")  # 로그 추가

            try:
                patient = Patient.objects.get(id=patient_id)
            except Patient.DoesNotExist:
                return JsonResponse({'status': 'error', 'message': 'Patient does not exist'})

            # 이미지 인스턴스 생성 및 저장
            image_instance = MRIImage(
                image=request.FILES['image'],
                patient=patient
            )
            image_instance.save()

            # 저장된 이미지의 URL
            image_url = image_instance.image.url
            image_path = image_instance.image.path

            # 모델과 라벨맵 로드
            model_structure_path = Path(settings.BASE_DIR) / 'myapp/model/model.json'
            model_weights_path = Path(settings.BASE_DIR) / 'myapp/model/model_weights.h5'
            label_map_path = Path(settings.BASE_DIR) / 'myapp/model/label_map_1.json'
            model = load_custom_model(model_structure_path, model_weights_path)
            label_map = load_label_map(label_map_path)

            # 이미지 예측
            predictions = predict_image(model, image_path)
            if predictions is not None:
                predicted_class_index = int(np.argmax(predictions[0]))
                predicted_class_name = label_map[str(predicted_class_index)]
                confidence = float(np.max(predictions[0]))

                JsonResponse({
                    'status': 'success',
                    'image_url': image_url,
                    'description': predicted_class_name,
                    'confidence': confidence
                })


        return JsonResponse({
            'status': 'error',
            'message': 'Failed to upload image',
            'errors': form.errors
        })
    else:
        form = ImageUploadForm()
        return render(request, 'myapp/upload_image.html', {'form': form})
