# myapp/urls.py
from django.urls import path
from .views import PredictView
from .views import upload_image
urlpatterns = [
    path('predict/', PredictView.as_view(), name='predict'),
    path('', upload_image, name='upload_image'),  # 루트 URL
]
