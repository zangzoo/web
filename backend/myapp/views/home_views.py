# myapp/views/home_views.py
from django.shortcuts import render, get_object_or_404
from myapp.models import Patient, MRIImage

def home_view(request):
    # GET 파라미터에서 선택된 환자 ID 가져오기
    selected_patient_id = request.GET.get('patient_id')

    if selected_patient_id:
        # 선택된 환자의 정보와 관련된 MRI 이미지를 가져옵니다.
        selected_patient = get_object_or_404(Patient, id=selected_patient_id)
        mri_images = MRIImage.objects.filter(patient=selected_patient)
    else:
        # 선택된 환자가 없으면 None으로 처리
        selected_patient = None
        mri_images = None

    # 모든 환자 리스트 가져오기 (드롭다운용)
    patients = Patient.objects.all()

    return render(request, 'myapp/home.html', {
        'patients': patients,
        'selected_patient': selected_patient,
        'mri_images': mri_images,
    })
