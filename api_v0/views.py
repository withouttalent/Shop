from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
import redis
import json
from .serializers import *

class DetailUser(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        user = Profile.objects.get(user__username=request.user)
        serializer = ProfileSerializer(user)
        return Response(serializer.data)

class CreateUser(APIView):
    permission_classes = ()

    def post(self, request, format=None):
        try:
            user = User.objects.create_user(request.data['username'],
                                            request.data['email'],
                                            request.data['password'])
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        pall = json.dumps({"username":request.data["username"], "password":request.data["password"]})
        call = json.loads(pall)
        print(call)
        serializer = TokenObtainPairSerializer(data=call)
        past = serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_201_CREATED)





class ListUsers(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        print(request.user)
        users = Profile.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

########################################################################################################################
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


class FetchMessageThread(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        print(request.data)
        thread = int(request.data['thread'])
        fetch = request.data['fetch']
        message_iter = request.data['message_iter']
        queryset = User.objects.get(username=request.user).thread_set.get(pk=thread).message_set.order_by("-datetime")[message_iter:fetch]
        print("Hi")
        serializer = ChatSerializer(queryset[::-1], many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AddMessageInThread(APIView):
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
            # try:
            message = Message.objects.all()
            r = redis.StrictRedis()
            message.create(text=request.data['message'], sender=user, thread=thread)
            last_msg = thread.message_set.latest("id")
            payload = {"id":last_msg.id,
                       "text":last_msg.text,
                       "datetime":str(last_msg.datetime),
                       "sender":last_msg.sender.username,
                       "thread":last_msg.thread.id}
            r.publish("".join("thread:" + str(thread.id)), payload)
            return Response(status=status.HTTP_200_OK)
            # except:
            #     return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ThreadView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, id, format=None):
        queryset = User.objects.get(username=request.user).thread_set.get(pk=id).message_set.order_by("-datetime")[:20]
        serializer = ChatSerializer(queryset[::-1], many=True)
        return Response(serializer.data)


########################################################################################################################
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


