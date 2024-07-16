from django import forms
from myapp.models import MRIImage
from django.contrib.auth.forms import AuthenticationForm


class ImageUploadForm(forms.ModelForm):
    class Meta:
        model = MRIImage
        fields = ['image']

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

