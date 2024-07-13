# myapp/urls.py
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from myapp.views.login_views import login_view
from myapp.views.upload_views import upload_image
from myapp.views.predict_views import PredictView

urlpatterns = [
    path('upload_image/', upload_image, name='upload_image'),
    #path('login/', login_view, name='login'),  # 로그인 URL 패턴 추가 
    path('',login_view, name='login'),
    path('predict/',PredictView.as_view(), name='predict')
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
