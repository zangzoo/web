from django.db import models

class Hospital(models.Model):
    hospital_name = models.CharField(max_length=255)

    def __str__(self):
        return self.hospital_name

class User(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    tel = models.CharField(max_length=20)
    date_joined = models.DateTimeField(auto_now_add=True)
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)

    def __str__(self):
        return self.username

class Patient(models.Model):
    patient_name = models.CharField(max_length=255)
    dob = models.DateField()
    gender = models.CharField(max_length=6, choices=[('Male', 'Male'), ('Female', 'Female')])
    age = models.IntegerField()
    medical_history = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.patient_name

class MRIImage(models.Model):
    image = models.ImageField(upload_to='images/', default='images/default.jpg')  # ImageField로 변경
    upload_date = models.DateTimeField(auto_now_add=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)

    def __str__(self):
        return f'MRI Image of {self.patient.patient_name}'

class Prediction(models.Model):
    predicted_label = models.CharField(max_length=255)
    confidence_score = models.DecimalField(max_digits=5, decimal_places=2)
    prediction_date = models.DateTimeField(auto_now_add=True)
    image = models.ForeignKey(MRIImage, on_delete=models.CASCADE)

    def __str__(self):
        return f'Prediction for {self.image.patient.patient_name} - {self.predicted_label}'
