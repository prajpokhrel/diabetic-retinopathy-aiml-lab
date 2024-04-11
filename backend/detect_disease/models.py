from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Patient(models.Model):
  first_name = models.CharField(max_length=50)
  last_name = models.CharField(max_length=50)
  age = models.IntegerField()
  passport_number = models.CharField(max_length=20)
  diagnosis = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)
  doctor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="patients")

  def __str__(self):
    return self.passport_number

class LesionImage(models.Model):
    lesion_type = models.CharField(max_length=100)
    image = models.ImageField(upload_to='post_images')
    
    def __str__(self):
        return self.lesion_type