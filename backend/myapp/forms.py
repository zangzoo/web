from django import forms
from .models import PatientImage

class ImageUploadForm(forms.ModelForm):
    class Meta:
        model = PatientImage  # PatientImage 모델을 사용합니다.
        fields = ['patient_id', 'image']  # 필요한 필드를 지정합니다.