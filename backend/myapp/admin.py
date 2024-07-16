from django.contrib import admin
from .models import Hospital, User, Patient, MRIImage, Prediction

admin.site.register(Hospital)
admin.site.register(User)
admin.site.register(Patient)
admin.site.register(MRIImage)
admin.site.register(Prediction)
