from django.contrib import admin
from django.urls import path, include
from backendAPI import views

app_name = 'backendAPI'
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:article_id>/', views.filter, name='filter')
]
