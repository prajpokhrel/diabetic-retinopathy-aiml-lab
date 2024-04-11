from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Patient, LesionImage

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username', 'first_name', 'last_name', 'password']
    extra_kwargs = { "password": { "write_only": True }}

  def create(self, validated_data):
    user = User.objects.create_user(**validated_data)
    return user

class ImageUploadSerializer(serializers.Serializer):
    image = serializers.ImageField(required=False, allow_empty_file=True)
    lesion_type = serializers.CharField(max_length = 100)

class PatientSerializer(serializers.ModelSerializer):
  class Meta:
    model = Patient
    fields = ['id', 'first_name', 'last_name', 'age', 'passport_number', 'diagnosis', 'created_at', 'doctor']
    extra_kwargs = { "doctor": { "read_only": True } }

    