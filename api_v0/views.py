from rest_framework import generics
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import *


class DetailUser(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        user = User.objects.filter(username=request.user)
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)



class ListUsers(APIView):
    permission_classes = ()

    def get(self, request, format=None):
        print(request.user)
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)




class ArticleViewSet(viewsets.ReadOnlyModelViewSet):
   queryset = Article.objects.all()
   permission_classes = (permissions.IsAuthenticated,)
   def get_serializer_class(self):
       print()
       if self.action == 'list':
           return ArticlePreviewSerializer
       return ArticleDetailSerializer


class FilterItem(generics.ListAPIView):
    serializer_class = ArticlePreviewSerializer
    permission_classes = ()

    def get_queryset(self):
        getFilter = self.kwargs['filter']
        return Article.objects.filter(category__name=getFilter)


class ViewCategories(viewsets.ReadOnlyModelViewSet):
    queryset = Categories.objects.all()
    permission_classes = ()
    def get_serializer_class(self):
        return CategoriesSerializer


