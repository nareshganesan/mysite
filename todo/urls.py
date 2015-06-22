from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.todolist, name='index'),
    url(r'^quickdetail_todo/$', views.quickdetail_todo, name='quickdetail_todo'),
    url(r'^edit_todo/$', views.edit_todo, name='edit_todo'),
    url(r'^(?P<todo_id>[0-9]+)/$', views.tododetail, name='detail'),
    url(r'^quickedit_todo/$', views.quickedit_todo, name='quickedit_todo'),
    url(r'^quickadd_todo/$', views.quickadd_todo, name='quickadd_todo'),
    url(r'^quickdelete_todo/$', views.quickdelete_todo, name='quickdelete_todo'),
    url(r'^add_todo/$', views.create_todo, name='add_todo'),
    url(r'^delete_todo/(?P<todo_id>[0-9]+)/$', views.remove_todo, name='delete_todo'),
]