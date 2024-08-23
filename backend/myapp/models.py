from django.db import models
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class Hospital(models.Model):
    hospital_name = models.CharField(max_length=255)

    def __str__(self):
        return self.hospital_name


class MyUserManager(BaseUserManager):
    def create_user(self, userID, password=None, **extra_fields):
        if not userID:
            raise ValueError('The UserID field must be set')
        user = User(userID=userID, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, userID, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(userID, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    userID = models.CharField(max_length=50, unique=True)  # 회원 아이디
    name = models.CharField(max_length=255)  # 사용자 이름
    password = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    tel = models.CharField(max_length=20)
    date_joined = models.DateTimeField(auto_now_add=True)
    hospital = models.CharField(max_length=255, null=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = 'userID'
    REQUIRED_FIELDS = ['email', 'name', 'tel']  # 'hospital' 제거

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def __str__(self):
        return self.userID

class Patient(models.Model):
    patient_name = models.CharField(max_length=255)
    dob = models.DateField()
    gender = models.CharField(max_length=6, choices=[('Male', 'Male'), ('Female', 'Female')])
    age = models.IntegerField()
    medical_history = models.TextField()

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
