from django.contrib import admin
from .models import Article, Charect, Categories
# Register your models here.


class CharectInline(admin.StackedInline):
    model = Charect
    extra = 0


class Display(admin.ModelAdmin):
    inlines = [CharectInline]

admin.site.register(Article, Display)
admin.site.register(Categories)