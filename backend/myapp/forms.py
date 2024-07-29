from django import forms
from myapp.models import MRIImage, User, Hospital
from django.core.validators import EmailValidator
import logging
import re

logger = logging.getLogger(__name__)

class ImageUploadForm(forms.ModelForm):
    class Meta:
        model = MRIImage
        fields = ['image']


class RegisterForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    password_confirm = forms.CharField(widget=forms.PasswordInput, label="비밀번호 확인")
    email_domain = forms.ChoiceField(choices=[('naver.com', 'naver.com'), ('gmail.com', 'gmail.com'), ('daum.net', 'daum.net'), ('nate.com', 'nate.com')])

    class Meta:
        model = User
        fields = ['userID', 'password', 'password_confirm', 'name', 'hospital', 'email', 'email_domain', 'tel']

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        password_confirm = cleaned_data.get("password_confirm")

        logger.debug(f"Password: {password}, Password Confirm: {password_confirm}")

        if password != password_confirm:
            raise forms.ValidationError("비밀번호가 일치하지 않습니다.")

        email = self.data.get('email')

        if email:
            # EmailValidator를 사용하여 이메일 유효성 검사
            email_validator = EmailValidator()
            try:
                email_validator(email)
            except forms.ValidationError as e:
                logger.error(f"Email validation error: {e}")
                raise forms.ValidationError(f"유효한 이메일 주소를 입력해주세요: {full_email}")

            logger.info(f"Combined email: {email}")
            cleaned_data['email'] = email

        return cleaned_data

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password'])  # 비밀번호 해시 처리
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
        return user


class LoginForm(forms.Form):
    userID = forms.CharField(max_length=150)
    password = forms.CharField(widget=forms.PasswordInput)
    remember = forms.BooleanField(required=False)