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
    image = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class SliderItem(models.Model):
    product = models.ForeignKey(Product)
    slider_image = models.CharField(max_length=20)

    def __str__(self):
        return self.product.name
