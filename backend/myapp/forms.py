from django import forms
from .models import PatientImage

class ImageUploadForm(forms.ModelForm):
    class Meta:
        model = PatientImage
        fields = ['patient_id', 'image'] # 사용자로부터 입력받을 필드 지정


