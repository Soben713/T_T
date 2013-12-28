import random
from django.db import models
import re


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

    def get_related_objects(self):
        ret = []
        for product in Product.objects.all():
            # Return the products that have a common word in their name with self.name
            if product == self:
                continue
            product_words = re.sub("[^\w]", " ",  product.name).split()
            self_words = re.sub("[^\w]", " ",  self.name).split()
            for word in product_words:
                if word in self_words:
                    ret.append(product)
                    break
        return ret

    @property
    def rating(self):
        """
        Random now, have to be implemented later
        """
        return random.random() * 5


class SliderItem(models.Model):
    product = models.ForeignKey(Product)
    slider_image = models.FileField(upload_to='slider/')

    def __str__(self):
        return self.product.name
