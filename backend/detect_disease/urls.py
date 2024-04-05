from django.urls import path
from . import views

urlpatterns = [
  path("patients/", views.PatientListCreate.as_view(), name = 'patient-list'),
  path("patient/delete/<int:pk>/", views.PatientDelete.as_view(), name = 'delete-patient'),
  path("user/", views.UserList.as_view(), name='user-data')
]