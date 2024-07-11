# backend/myapp/urls.py

from django.urls import path
from .views import PredictView, upload_image

urlpatterns = [
    path('', PredictView.as_view(), name='predict'),  # 기본 경로를 predict로 설정합니다.
    path('upload/', upload_image, name='upload_image'),  # 이미지 업로드 경로를 설정합니다.
]