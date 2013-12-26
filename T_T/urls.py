from django.conf.urls import patterns, include, url

from django.contrib import admin
from django.views.generic.base import TemplateView

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'T_T.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^home/$', TemplateView.as_view(template_name='home.html')),
    url(r'^list/$', TemplateView.as_view(template_name='list.html')),
    url(r'^products/sample/$', TemplateView.as_view(template_name='sample-product.html')),
    url(r'^moderate/add-product/$', TemplateView.as_view(template_name='add-product.html')),
)
