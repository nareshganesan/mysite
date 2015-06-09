from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.todolist, name='index'),
    url(r'^(?P<todo_id>[0-9]+)/$', views.tododetail, name='detail'),
]