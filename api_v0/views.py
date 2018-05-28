from rest_framework import viewsets
from .serializers import *
from rest_framework.test import APITestCase
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from rest_framework import generics
from django.urls import reverse



class ArticleViewSet(viewsets.ReadOnlyModelViewSet):
   queryset = Article.objects.all()


   def get_serializer_class(self):
       if self.action == 'list':
           return ArticlePreviewSerializer
       return ArticleDetailSerializer



# class FilterItem(viewsets.ViewSet):
#     def list(self, request, filter, format=None):
#         print(filter)
#         filter = Article.objects.filter(category__name=filter)
#         serializer = ArticlePreviewSerializer(filter, many=True)
#         return Response(serializer.data)



class FilterItem(generics.ListAPIView):
    serializer_class = ArticlePreviewSerializer

    def get_queryset(self):
        getFilter = self.kwargs['filter']
        return Article.objects.filter(category__name=getFilter)


class ViewCategories(viewsets.ReadOnlyModelViewSet):
    queryset = Categories.objects.all()

    def get_serializer_class(self):
        return CategoriesSerializer


class UserCreate(APIView):
    """
    Creates the user.
    """

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)