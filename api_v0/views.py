from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

import json
from .serializers import *


class DetailUser(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        user = Profile.objects.get(user__username=request.user)
        serializer = ProfileSerializer(user)
        return Response(serializer.data)



class ListUsers(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        print(request.user)
        users = Profile.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class Threads(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        queryset = User.objects.get(username=request.user).thread_set.all()
        serializer = ThreadSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        try:
            user = User.objects.get(username=request.user)
            participants = User.objects.get(pk=request.data['id'])
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            queryset = Thread.objects.create()
            queryset.participants.add(user, participants)
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class AddThread(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self):
        pass


    def post(self, request, format=None):
        if request.data["message"]:
            try:
                user = User.objects.get(username=request.user)
                thread = Thread.objects.get(pk=request.data['thread'])
            except:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            try:
                message = Message.objects.all()
                message.create(text=request.data['message'], sender=user, thread=thread)
                return Response(status=status.HTTP_200_OK)
            except:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)




class ThreadView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, id, format=None):
        queryset = User.objects.get(username=request.user).thread_set.get(pk=id).message_set.all()
        serializer = ChatSerializer(queryset, many=True)
        return Response(serializer.data)


class ListCart(APIView):
    permissions_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        queryset = User.objects.get(username=request.user).orderitem_set.all()
        serializers = UserCartSerializer(queryset, many=True)
        return Response(serializers.data)

    def post(self, request, format=None):
        print(request.data)
        article = Article.objects.get(pk=request.data['id'])
        User.objects.get(username=request.user).orderitem_set.create(article=article, count=request.data['count'])
        return Response(status=status.HTTP_201_CREATED)

    def delete(self, request, format=None):
        print(request)
        post = request.data
        try:
            queryset = OrderItem.objects.filter(user__username=request.user).get(pk=request.data['id']).delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class RemoveInCart(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, id, format=None):
        try:
            queryset = OrderItem.objects.filter(user__username=request.user).get(pk=id).delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)





class ArticleViewSet(viewsets.ReadOnlyModelViewSet):

   queryset = Article.objects.all()
   permission_classes = ()
   def get_serializer_class(self):
       print()
       if self.action == 'list':
           return ArticlePreviewSerializer
       return ArticleDetailSerializer


class ArticleDetailView(APIView):
    permission_classes = ()

    def get(self, request, id, format=None):
        queryset = Article.objects.get(pk=id)
        serializer = ArticleDetailSerializer(queryset)
        return Response(serializer.data)



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


