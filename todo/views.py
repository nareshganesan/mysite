from django.shortcuts import render
from django.http import HttpResponse
from django.http import Http404

from .models import Todo

# Create your views here.


def todolist(request):
    latest_todo_list = Todo.objects.order_by('-priority')[:10]
    context =  {'latest_todo_list': latest_todo_list}
    return render(request, 'todo/index.html', context)

def tododetail(request, todo_id):
    try:
        todo = Todo.objects.get(pk=todo_id)
    except Todo.DoesNotExist:
        raise Http404("Todo does not exist.")
    return render(request, 'todo/detail.html', {'todo': todo})