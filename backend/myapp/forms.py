from django import forms
from myapp.model import PatientImage
from django.contrib.auth.forms import AuthenticationForm


class ImageUploadForm(forms.ModelForm):
    class Meta:
        model = PatientImage
        fields = ['patient_id', 'image'] # 사용자로부터 입력받을 필드 지정


class LoginForm(AuthenticationForm):
    username = forms.CharField(
        max_length=254,
        widget=forms.TextInput(attrs={'placeholder': 'ID', 'class': 'form-control'})
    )
    password = forms.CharField(
        label="Password",
        strip=False,
        widget=forms.PasswordInput(attrs={'placeholder': 'Password', 'class': 'form-control'}),
    )