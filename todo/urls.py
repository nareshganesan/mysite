from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.todolist, name='index'),
    url(r'^(?P<todo_id>[0-9]+)/$', views.tododetail, name='detail'),
    url(r'^quickedit_todo/$', views.quickedit_todo, name='quickedit_todo'),
    url(r'^add_todo/$', views.create_todo, name='add_todo'),
    url(r'^delete_todo/(?P<todo_id>[0-9]+)/$', views.remove_todo, name='delete_todo'),
]