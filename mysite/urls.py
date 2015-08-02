"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/dev/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    # Home page for the site.
    url(r'^$', 'todo.views.home', name='home'),
    # registration page for the site.
    url(r'^register', 'views.register', name='register'),
    # registration page for the site.
    url(r'^accounts/profile', 'todo.views.home', name='profile'),
    # login page for the site.
    url(r'^accounts/login', 'django.contrib.auth.views.login', name='login'),
    # logout page for the site. # {'next_page': '/accounts/login/?next=/'}
    url(r'^logout', 'django.contrib.auth.views.logout', {'next_page': '/'}, name='logout'),
    # admin module provided by django.
    url(r'^admin/', include(admin.site.urls)),
    # Polls app created from the django book tutorial.
    url(r'^polls/', include('polls.urls', namespace="polls")),
    # Todo app created on my own for learning purpose.
    url(r'^todo/', include('todo.urls', namespace="todo")),
    # Custom login attempt for Todo app.
    url(r'^login/', 'todo.views.login_request', name='login_request'),

]
