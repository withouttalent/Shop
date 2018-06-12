from django.contrib.auth.models import User
from django.db import models


class Thread(models.Model):
    participants = models.ManyToManyField(User)
    last_message = models.DateTimeField(null=True, blank=True, db_index=True)



class Message(models.Model):
    text = models.TextField()
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    datetime = models.DateTimeField(auto_now_add=True, db_index=True)

    def __str__(self):
        return self.text
