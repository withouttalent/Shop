from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from api_v0.models import *
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
    extra = 0


class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    fk_name = 'user'


class ThreadInline(admin.StackedInline):
    model = Thread
    can_delete = False


class MessageInline(admin.StackedInline):
    model = Message
    can_delete = False
    fk_name = 'sender'
    extra = 0


class CustomUserAdmin(UserAdmin):
    inlines = (ProfileInline, OrderInline, MessageInline)


admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
admin.site.register(Article, Display)
admin.site.register(Categories)
admin.site.register(Thread)
