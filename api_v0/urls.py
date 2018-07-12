from django.urls import path
from rest_framework.routers import SimpleRouter
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView, TokenVerifyView)

from .views import *

router = SimpleRouter()
# router.register(r'articles', ArticleViewSet)
router.register(r'categories', ViewCategories)

urlpatterns = [
    path('filter/<str:filter>/', FilterItem.as_view()),
    path('create-user/', CreateUser.as_view()),
    path('articles/', ArticleViewSet.as_view({'get': 'list'})),
    path('articles/<int:id>/', ArticleDetailView.as_view()),
    path('users/', ListUsers.as_view()),
    path('user-detail/', DetailUser.as_view()),
    path('api-token-auth/', TokenObtainPairView.as_view()),
    path('api-token-verify/', TokenVerifyView.as_view()),
    path('api-token-refresh/', TokenRefreshView.as_view()),
    path('user-cart/', ListCart.as_view()),
    path('user-cart/remove/<int:id>/', RemoveInCart.as_view()),
    path('threads/', Threads.as_view()),
    path('thread/<int:id>/', ThreadView.as_view()),
    path('thread/fetch-message/', FetchMessageThread.as_view()),
    path('thread/add/', AddMessageInThread.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
urlpatterns += router.urls
