from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=200)
    parent = models.ForeignKey('self', null=True, blank=True, related_name='children')

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    creation_time = models.DateTimeField()
    price = models.IntegerField()
    category = models.ForeignKey(Category)
    image = models.FileField(upload_to='thumbnail/')  # FileField because PIL is not python3 compatible!

    def __str__(self):
        return self.name


class SliderItem(models.Model):
    product = models.ForeignKey(Product)
    slider_image = models.FileField(upload_to='slider/')

    def __str__(self):
        return self.product.name
