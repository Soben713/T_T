import json
from django.db.models.query_utils import Q
from django.http.response import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from news.models import News
from shop.models import SliderItem, Product


def home(request):
    return render(request, 'home.html', {
        'slider_items': SliderItem.objects.all(),
        'last_products': Product.objects.all().order_by('-creation_time')[:5],
        'pop_products': sorted(Product.objects.all(), key=lambda x: x.rating)[:5],
        'last_news': News.objects.all().latest(field_name='date'),
    })


def product(request, pk):
    product = Product.objects.get(pk=pk)
    return render(request, 'product.html', {
        'product': product
    })


@csrf_exempt
def product_list(request):
    data = request.POST
    page = int(data['page'])
    page_size = int(data['pageSize'])

    response = {
        'result': 1,
        'page': page,
        'pageSize': page_size,
    }

    results = Product.objects.filter(Q(name__contains=data['search']) | Q(description__contains=data['search']))
    response['totalResults'] = results.count()
    results = results[(page - 1) * page_size: page * page_size]

    productList = []
    for item in results:
        productList.append({
            'id': item.pk,
            'name': item.name,
            'price': item.price,
            'category': item.category.pk,
            'picUrl': item.image.url,
        })
    response['productList'] = productList

    return HttpResponse(json.dumps(response), mimetype='application/javascript')
