from rest_framework import serializers
from sorl_thumbnail_serializer.fields import HyperlinkedSorlImageField

from backendAPI.models import *
from .models import *


class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = [
            'name'
        ]


class ArticlePreviewSerializer(serializers.ModelSerializer):
   pics = HyperlinkedSorlImageField('156x156',
                                     options={"crop": "noop"},
                                     source='get_thumbnail_url',
                                     read_only=True)
   category = CategoriesSerializer(read_only=True, many=True)
   class Meta:
       model = Article
       fields = [
           'id',
           'title',
           'pics',
           'price',
           'category',
       ]

class ArticleDetailSerializer(serializers.ModelSerializer):
    pics = serializers.URLField(source='get_absolute_url')
    category = CategoriesSerializer(read_only=True, many=True)
    class Meta:
       model = Article
       fields = ['id', 'title', 'date', 'desc', 'pics', 'price', 'rep', 'category']



class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")
    user_id = serializers.IntegerField(source="user.id")
    pic = serializers.URLField(source='get_absolute_url')
    class Meta:
        model = Profile
        fields = ('user_id', 'username', 'pic')


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")
    email = serializers.CharField(source="user.email")
    is_active = serializers.BooleanField(source="user.is_active")
    pic = serializers.URLField(source="get_absolute_url")

    # user = UserSerializer(read_only=True)
    class Meta:
        model = Profile
        fields = ('username', 'email', 'is_active', 'id', 'pic')

class UserCartSerializer(serializers.ModelSerializer):
    article = ArticlePreviewSerializer(read_only=True)
    class Meta:
        model = OrderItem
        fields = ('id', 'count', 'user', 'article')


class UserWrap(serializers.ModelSerializer):
    pic = serializers.URLField(source="profile.get_absolute_url")

    class Meta:
        model = User
        fields = ('id', "username", 'pic')


class ThreadSerializer(serializers.ModelSerializer):
    participants = UserWrap(many=True, read_only=True)

    class Meta:
        model = Thread
        fields = ('id', 'participants')


class ChatSerializer(serializers.ModelSerializer):
    sender = serializers.CharField(source="sender.username")

    class Meta:
        model = Message
        fields = ('id', 'text', 'datetime', 'sender', 'thread')
