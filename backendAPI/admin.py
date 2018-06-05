from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

from .models import *


# Register your models here.


class CharectInline(admin.StackedInline):
    model = Charect
    extra = 0



class Display(admin.ModelAdmin):
    inlines = [CharectInline]


class OrderInline(admin.StackedInline):
    model = OrderItem
    fk_name = "user"


class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    fk_name = 'user'


class CustomUserAdmin(UserAdmin):
    inlines = (ProfileInline, OrderInline)


admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
admin.site.register(Article, Display)
admin.site.register(Categories)