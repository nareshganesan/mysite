from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.todolist, name='index'),
    url(r'^quickdetail_todo/$', views.quickdetail_todo, name='quickdetail_todo'),
    url(r'^edit_todo/$', views.edit_todo, name='edit_todo'),
    url(r'^quickedit_todo/$', views.quickedit_todo, name='quickedit_todo'),
    url(r'^quickadd_todo/$', views.quickadd_todo, name='quickadd_todo'),
    url(r'^quickdelete_todo/$', views.quickdelete_todo, name='quickdelete_todo'),
    url(r'^reports/todo_reports/$', views.todo_reports, name='todo_reports'),
    url(r'^reports/$', views.reports, name='reports'),
    url(r'^mark_as_completed/$', views.mark_as_completed, name='mark_as_completed'),
    url(r'^search/$', views.todo_search, name='todo_search'),
]