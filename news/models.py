from django.db import models


class News(models.Model):
    date = models.DateTimeField()
    title = models.CharField(max_length=200)
    description = models.TextField()

