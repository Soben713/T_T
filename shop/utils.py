from django.forms.models import ModelForm
from shop.models import Product


class ProductForm(ModelForm):
    class Meta:
        model = Product
        exclude = ['creation_time']