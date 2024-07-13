from django.db import models

class PatientImage(models.Model):
    patient_id = models.CharField(max_length=100)
    image = models.ImageField(upload_to='patient_images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) :
        return self.patient_id
