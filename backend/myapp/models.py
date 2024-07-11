from django.db import models

# Create your model here.
from django.db import models

# 업로드할 이미지 저장할 모델 = ImageField
class PatientImage(models.Model):
    patient_id = models.CharField(max_length=100)
    image = models.ImageField(upload_to='patient_images/')
    upload_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.patient_id} uploaded on {self.upload_date}"