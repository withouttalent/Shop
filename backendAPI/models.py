from django.db import models

# Create your models here.
class Categories(models.Model):
    name = models.CharField(max_length=200)
    desc = models.TextField(blank=True)
    pic = models.ImageField(blank=True, upload_to='templates/media')

    def __str__(self):
        return self.name


class Article(models.Model):
    title = models.CharField(max_length=160)
    date = models.DateField(auto_now=True)
    desc = models.TextField()
    pics = models.ImageField(blank=True, upload_to='templates/media')
    price = models.PositiveIntegerField(default=0)
    rep = models.PositiveIntegerField(default=0)
    category = models.ForeignKey(Categories, on_delete=models.CASCADE)
    def __str__(self):
        return self.title

    @property
    def announce(self):
        return self.desc[:512]

class Charect(models.Model):
    articles = models.ForeignKey(Article, on_delete=models.CASCADE)
    char = models.CharField(max_length=80)
    char_ans = models.CharField(max_length=20)

    def __str__(self):
        return self.char




