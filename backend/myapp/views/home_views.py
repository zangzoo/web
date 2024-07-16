# myapp/views/home_views.py
from django.shortcuts import render
from myapp.models import Patient

def home_view(request):
    patients = Patient.objects.all()  # 모든 환자 데이터를 가져옴
    return render(request, 'myapp/home.html', {'patients': patients})
