from rest_framework import serializers
from backendAPI.models import Article, Categories
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User



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
    email = serializers.EmailField(required=True,
                                   validators=[UniqueValidator(queryset=User.objects.all())])
    username = serializers.CharField(required=True,
                                     validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(min_length=8)


    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
                                        validated_data['email'],
                                        validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')