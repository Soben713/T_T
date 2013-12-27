from django.conf.urls import patterns, include, url

from django.contrib import admin
from django.views.generic.base import TemplateView
from T_T import settings
from shop.views import home

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'T_T.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', home),
    url(r'^list/$', TemplateView.as_view(template_name='list.html')),
    url(r'^products/sample/$', TemplateView.as_view(template_name='sample-product.html')),
    url(r'^moderate/add-product/$', TemplateView.as_view(template_name='add-product.html')),
)

if settings.DEBUG:
    urlpatterns += patterns('', (r'^media/(?P<path>.*)$', 'django.views.static.serve', {
                                'document_root': settings.MEDIA_ROOT})
    )