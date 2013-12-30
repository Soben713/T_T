import datetime
import json
from PIL import Image
from django.db.models.query_utils import Q
from django.forms.models import modelform_factory, ModelForm
from django.http.response import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from news.models import News
from shop.models import SliderItem, Product, Category
from shop.utils import ProductForm


def home(request):
    return render(request, 'home.html', {
        'slider_items': SliderItem.objects.all(),
        'last_products': Product.objects.all().order_by('-creation_time')[:5],
        'pop_products': sorted(Product.objects.all(), key=lambda x: x.rating)[:5],
        'last_news': News.objects.all().latest(field_name='date'),
        'first_level_category': Category.objects.filter(parent=None),
    })


def product(request, pk):
    product = Product.objects.get(pk=pk)
    return render(request, 'product.html', {
        'product': product
    })


def product_list_page(request):
    return render(request, 'list.html', {
        'first_level_category': Category.objects.filter(parent=None),
    })


@csrf_exempt
def ajax_get_product(request, pk):
    p = Product.objects.get(id=pk)
    response = {
        'picUrl': p.image.url,
        'name': p.name,
        'id': pk,
        'price': p.price,
        'category': p.category.id,
    }
    return HttpResponse(json.dumps(response), 'application/javascript')


@csrf_exempt
def ajax_product_list(request):
    data = request.POST
    page = int(data['page'])
    page_size = int(data['pageSize'])
    response = {
        'result': 1,
        'page': page,
        'pageSize': page_size,
    }

    query = Q(name__contains=data['search']) | Q(description__contains=data['search']) | \
            Q(category__name__contains=data['search'])

    if data.get('from_date', []):
        date_arr = [int(i) for i in data['from_date'].split('/')]
        query = query & Q(creation_time__gte=datetime.date(*date_arr))

    if data.get('to_date', []):
        date_arr = [int(i) for i in data['to_date'].split('/')]
        query = query & Q(creation_time__lte=datetime.date(*date_arr))

    if data.get('from_price', '') != '':
        query = query & Q(price__gte=int(data['from_price']))

    if data.get('to_price', '') != '':
        query = query & Q(price__lte=int(data['to_price']))

    _results = Product.objects.filter(query)
    results = []
    for _result in _results:
        if data.get('category', '0') == '0' or _result.in_category(Category.objects.get(id=data['category'])):
            results.append(_result)

    response['totalResults'] = len(results)
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


def seller_add_product(request):
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)  # A form bound to the POST data
        if form.is_valid():
            product = form.save(commit=False)
            product.save()
            img = Image.open(product.image.path)
            rect = (int(request.POST['x1']),
                    int(request.POST['y1']),
                    int(request.POST['x1']) + int(request.POST['width']),
                    int(request.POST['y1']) + int(request.POST['height']))
            img = img.crop(rect)
            img.save(product.image.path)
        return HttpResponseRedirect('/')
    else:
        form = ProductForm()
    return render(request, 'seller/add-product.html', {
        'form': form,
    })


def seller_products(request):
    return render(request, 'seller/products.html', {
        'products': Product.objects.all(), #TODO: send real data later
    })


def seller_transactions(request):
    return render(request, 'seller/transactions.html', {
        'products': Product.objects.all()[:5], #TODO: send real data later
    })
