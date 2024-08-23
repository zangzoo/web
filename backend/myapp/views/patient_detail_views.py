from django.shortcuts import render, get_object_or_404
from myapp.models import Patient

def patient_detail(request, id):
    patient = get_object_or_404(Patient, id=id)
    return render(request, 'myapp/patient_detail.html', {'patient': patient})