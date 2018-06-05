from rest_framework import serializers

from backendAPI.models import *


class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = [
            'name'
        ]


class ArticlePreviewSerializer(serializers.ModelSerializer):
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


class UserCartSerializer(serializers.ModelSerializer):
    article = ArticlePreviewSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'count', 'user', 'article']
