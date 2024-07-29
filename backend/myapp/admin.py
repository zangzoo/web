from django.contrib import admin
from .models import Hospital, User, Patient, MRIImage, Prediction

@admin.register(Hospital)
class HospitalAdmin(admin.ModelAdmin):
    list_display = ('hospital_name',)

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('userID', 'name', 'email', 'tel', 'date_joined', 'hospital')

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('patient_name', 'dob', 'gender', 'age', 'medical_history', 'user')

@admin.register(MRIImage)
class MRIImageAdmin(admin.ModelAdmin):
    list_display = ('image', 'upload_date', 'patient')

@admin.register(Prediction)
class PredictionAdmin(admin.ModelAdmin):
    list_display = ('predicted_label', 'confidence_score', 'prediction_date', 'image')
