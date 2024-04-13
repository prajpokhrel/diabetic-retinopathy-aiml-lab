from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import UserSerializer, PatientSerializer, ImageUploadSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Patient
from detect_disease.predictions.predict import generate_and_combine_patches
from PIL import Image
from io import BytesIO
from rest_framework.parsers import MultiPartParser, FormParser
import base64

# Create your views here.
class UserList(generics.ListAPIView):
  serializer_class = UserSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    user = self.request.user
    return User.objects.filter(username = user)

class UploadImage(APIView):
    parser_classes = (MultiPartParser, FormParser)
    
    def post(self, request, *args, **kwargs):
        serializer = ImageUploadSerializer(data=request.data)
        if serializer.is_valid():
          image_data = serializer.validated_data['image']
          lesion_type = serializer.validated_data['lesion_type']
          # Save the image to a folder
          input_image = Image.open(BytesIO(image_data.read()))
          predicted_image = generate_and_combine_patches(input_image, lesion_type)
          predicted_save = Image.fromarray(predicted_image)
          image = predicted_save.convert('RGB')
          image.save(f'media/predictions/lesion_images/predicted_{lesion_type}_image.jpg', "JPEG", quality=100)
          predicted_image_path = f'media/predictions/lesion_images/predicted_{lesion_type}_image.jpg'
          return Response({'predicted_image_url': predicted_image_path})
          # return Response('Success')
        else:
          return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PatientListCreate(generics.ListCreateAPIView):
  serializer_class = PatientSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    user = self.request.user
    return Patient.objects.filter(doctor = user).order_by('-created_at')

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

