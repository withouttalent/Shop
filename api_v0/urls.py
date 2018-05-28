from rest_framework.routers import DefaultRouter, SimpleRouter
from .views import *
from django.urls import path, include, re_path
from rest_framework.urlpatterns import format_suffix_patterns
from django.views import generic
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token


router = SimpleRouter()
router.register(r'articles', ArticleViewSet)
router.register(r'categories', ViewCategories)

urlpatterns = [
    path('filter/<str:filter>', FilterItem.as_view()),
    path('', generic.RedirectView.as_view(url='/api/', permanent=False)),
    path('api-token-auth/', obtain_jwt_token),
    path('api-token-verify/', verify_jwt_token),
    path('api-token-refresh/', refresh_jwt_token),
    path('create/', UserCreate.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
urlpatterns += router.urls
