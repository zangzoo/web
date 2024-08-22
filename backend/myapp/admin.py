from django.contrib import admin
from myapp.models import Hospital, User, Patient, MRIImage, Prediction


@admin.register(Hospital)
class HospitalAdmin(admin.ModelAdmin):
    list_display = ('hospital_name',)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('userID', 'name', 'email', 'tel', 'date_joined', 'hospital')

    # Last Login 필드를 읽기 전용으로 설정
    readonly_fields = ('last_login', 'date_joined')

    # Group과 User Permissions 필드를 선택적이지 않게 설정
    filter_horizontal = ()  # 기본 그룹 필터를 제거
    filter_vertical = ()  # 권한 필터도 제거


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('patient_name', 'dob', 'gender', 'age', 'medical_history', 'user')


@admin.register(MRIImage)
class MRIImageAdmin(admin.ModelAdmin):
    list_display = ('image', 'upload_date', 'patient')


@admin.register(Prediction)
class PredictionAdmin(admin.ModelAdmin):
    list_display = ('predicted_label', 'confidence_score', 'prediction_date', 'image')
