from django.conf.urls import patterns, include, url

from django.contrib import admin
from django.views.generic.base import TemplateView
from T_T import settings
from shop.views import home, product, ajax_product_list, seller_add_product, seller_products, seller_transactions, \
    product_list_page, ajax_get_product

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'T_T.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', home),
    url(r'^list/$', product_list_page, name='product_list_page'),
    url(r'^product/(?P<pk>\d+)/$', product, name='product'),
    url(r'^seller/add-product/$', seller_add_product, name='add_product'),
    url(r'^seller/transactions/$', seller_transactions, name='transactions'),
    url(r'^seller/products/$', seller_products, name='seller_products'),
    url(r'^ajax/product/list$', ajax_product_list, name='product_list'),
    url(r'^ajax/product/(?P<pk>\d+)/$', ajax_get_product)
)

if settings.DEBUG:
    urlpatterns += patterns('', (r'^media/(?P<path>.*)$', 'django.views.static.serve', {
                                'document_root': settings.MEDIA_ROOT})
    )
