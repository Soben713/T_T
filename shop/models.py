import datetime
import random
from django.core.exceptions import ValidationError
from django.db import models
import re


class Category(models.Model):
    name = models.CharField(max_length=200)
    parent = models.ForeignKey('self', null=True, blank=True, related_name='children')

    def __str__(self):
        return self.name

    def clean(self):
        if self.parent is not None and self.parent.parent is not None:
            raise ValidationError("Depth limit exceeded")


class Product(models.Model):
    name = models.CharField(max_length=200, verbose_name='نام')
    description = models.TextField(verbose_name='توضیح')
    creation_time = models.DateTimeField(verbose_name='تاریخ ایجاد', default=datetime.datetime.now)
    price = models.IntegerField(verbose_name='قیمت')
    category = models.ForeignKey(Category, verbose_name='دسته')
    image = models.ImageField(upload_to='thumbnail/', verbose_name='عکس')

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

    @property
    def sold(self):
        """
        Random now, have to be implemented later
        """
        return random.randint(0, 100)

    def in_category(self, category: Category):
        if self.category == category:
            return True
        for child_category in category.children.all():
            if self.in_category(child_category):
                return True
        return False


class SliderItem(models.Model):
    product = models.ForeignKey(Product)
    slider_image = models.ImageField(upload_to='slider/')

    def __str__(self):
        return self.product.name
