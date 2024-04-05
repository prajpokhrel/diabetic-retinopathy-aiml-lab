from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Patient

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username', 'email', 'first_name', 'last_name', 'license_number', 'password']
    extra_kwargs = { "password": { "write_only": True }}

  def create(self, validated_data):
    user = User.objects.create_user(**validated_data)
    return user

class PatientSerializer(serializers.ModelSerializer):
  class Meta:
    model = Patient
    fields = ['id', 'first_name', 'last_name', 'passport_number', 'diagnosis', 'created_at', 'doctor']
    extra_kwargs = { "author": { "read_only": True } }
    