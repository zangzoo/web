# myapp/urls.py

from django.urls import path
from .views.predict_views import PredictView
from .views.upload_views import upload_image

urlpatterns = [
    path('', PredictView.as_view(), name='predict'),
    path('upload/', upload_image, name='upload_image'),
]
