# Generated by Django 2.0.4 on 2018-06-03 12:32

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=160, verbose_name='Название')),
                ('date', models.DateField(auto_now=True, verbose_name='Дата')),
                ('desc', models.TextField(verbose_name='Описание')),
                ('pics', models.ImageField(blank=True, upload_to='templates/media', verbose_name='Картинки')),
                ('price', models.PositiveIntegerField(default=0, verbose_name='Цена')),
                ('rep', models.PositiveIntegerField(default=0, verbose_name='Репутация')),
            ],
        ),
        migrations.CreateModel(
            name='Categories',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, verbose_name='Название категории')),
                ('desc', models.TextField(blank=True, verbose_name='Описание')),
                ('pic', models.ImageField(blank=True, upload_to='templates/media', verbose_name='Картинка')),
            ],
        ),
        migrations.CreateModel(
            name='Charect',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('char', models.CharField(max_length=80, verbose_name='Характеристика')),
                ('char_ans', models.CharField(max_length=20, verbose_name='Параметр Характериситки')),
                ('articles', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backendAPI.Article')),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('count', models.IntegerField(default=1)),
                ('article',
                 models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='backendAPI.Article')),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pic', models.ImageField(upload_to='templates/media', verbose_name='Фото')),
                (
                'user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='orderitem',
            name='profile',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='backendAPI.Profile'),
        ),
        migrations.AddField(
            model_name='article',
            name='category',
            field=models.ManyToManyField(to='backendAPI.Categories', verbose_name='Категория'),
        ),
    ]
