from rest_framework import serializers
from sorl_thumbnail_serializer.fields import HyperlinkedSorlImageField

from backendAPI.models import *


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
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'is_active')


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
