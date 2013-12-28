from django.conf.urls import patterns, include, url

from django.contrib import admin
from django.views.generic.base import TemplateView
from T_T import settings
from shop.views import home, product, product_list, product_list_page

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'T_T.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', home),
    url(r'^list/$', product_list_page, name='product_list_page'),
    url(r'^product/(?P<pk>\d+)/$', product, name='product'),
    url(r'^moderate/add-product/$', TemplateView.as_view(template_name='add-product.html')),
    url(r'^ajax/product/list$', product_list, name='product_list')
)

if settings.DEBUG:
    urlpatterns += patterns('', (r'^media/(?P<path>.*)$', 'django.views.static.serve', {
                                'document_root': settings.MEDIA_ROOT})
    )