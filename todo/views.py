from django.shortcuts import render
from django.http import HttpResponse

from .models import Todo

# Create your views here.


def index(request):
    latest_todo_list = Todo.objects.order_by('-priority')[:10]
    context =  {'latest_todo_list': latest_todo_list}
    return render(request, 'todo/index.html', context)