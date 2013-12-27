from django.shortcuts import render
from shop.models import SliderItem


def home(request):
    slider_items = SliderItem.objects.all()
    return render(request, 'home.html', {
        'slider_items': slider_items,
    })

