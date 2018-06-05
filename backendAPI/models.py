from django.contrib.auth.models import User, AbstractUser, AbstractBaseUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


# Create your models here.
class Categories(models.Model):
    name = models.CharField('Название категории', max_length=200)
    desc = models.TextField('Описание', blank=True)
    pic = models.ImageField('Картинка', blank=True, upload_to='templates/media')

    def __str__(self):
        return self.name


class Article(models.Model):
    title = models.CharField('Название', max_length=160)
    date = models.DateField('Дата', auto_now=True)
    desc = models.TextField('Описание')
    pics = models.ImageField('Картинки', blank=True)
    price = models.PositiveIntegerField('Цена', default=0)
    rep = models.PositiveIntegerField('Репутация', default=0)
    category = models.ManyToManyField(Categories, verbose_name='Категория')
    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return "http://127.0.0.1:8000" + self.pics.url

    @property
    def announce(self):
        return self.desc[:512]

class Charect(models.Model):
    articles = models.ForeignKey(Article, on_delete=models.CASCADE)
    char = models.CharField('Характеристика', max_length=80)
    char_ans = models.CharField('Параметр Характериситки', max_length=20)

    def __str__(self):
        return self.char


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    pic = models.ImageField('Фото', upload_to='templates/media')

    def __str__(self):
        return self.user.username

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()


class OrderItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    article = models.ForeignKey(Article, blank=True, on_delete=models.CASCADE)
    count = models.IntegerField(default=1)
