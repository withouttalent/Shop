from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from .models import Article

# Create your views here.

def index(request):
    articles = Article.objects.all()
    set = {
        'a': articles
    }
    return render(request, 'backendAPI/index.html', context=set)

def filter(request,article_id):
    article = Article.objects.filter(id=article_id)
    set = {
        'a' : article
    }
    return render(request, 'backendAPI/item.html', context=set)