from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, PatientSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from.models import Patient

# Create your views here.
class PatientListCreate(generics.ListCreateAPIView):
  serializer_class = PatientSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    user = self.request.user
    return Patient.objects.filter(doctor = user)

  def perform_create(self, serializer):
    if serializer.is_valid():
      serializer.save(doctor = self.request.user)
    else:
      print(serializer.errors)

class PatientDelete(generics.DestroyAPIView):
  serializer_class = PatientSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    user = self.request.user
    return Patient.objects.filter(doctor = user)

class CreateUserView(generics.CreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [AllowAny]

