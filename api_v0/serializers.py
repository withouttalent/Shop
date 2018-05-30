from django.contrib.auth.models import User
from rest_framework import serializers

from backendAPI.models import Article, Categories


class ArticlePreviewSerializer(serializers.ModelSerializer):
   category = serializers.ReadOnlyField(source='category.name')
   class Meta:
       model = Article
       fields = [
           'id',
           'title',
           'pics',
           'price',
           'category'
       ]


class ArticleDetailSerializer(serializers.ModelSerializer):
   class Meta:
       model = Article
       fields = [
           'title',
           'desc',
           'category',
           'date'
       ]

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = [
            'name'
        ]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name')
