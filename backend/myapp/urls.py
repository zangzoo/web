# myapp/urls.py
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from myapp.views.login_views import login_view
from myapp.views.upload_views import upload_image
from myapp.views.register_views import register_view
from myapp.views.home_views import home_view
from myapp.views.analysis_result_views import PredictView
from myapp.views.logout_views import logout_view
from myapp.views.history_views import history_views
from myapp.views.patient_detail_views import patient_detail
from myapp.views import report_views

urlpatterns = [
    path('upload_image/', upload_image, name='upload_image'),
    path('',login_view, name='login'),
    path('register/', register_view, name='register'),
    path('home/', home_view, name='home'),
    path('analysis_result', PredictView.as_view(), name='analysis_result'),
    path('logout/', logout_view, name='logout'),
    path('history/', history_views, name='history'),
    path('patient/<int:id>/', patient_detail, name='patient_detail'),
    path('download_report/', report_views.download_report, name='download_report'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
