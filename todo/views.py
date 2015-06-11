from django.shortcuts import render
from django.http import HttpResponse
from django.http import Http404

import json

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

def create_post(request):
    if request.method == 'POST':
        todoid = request.POST.get('todoid')
        todoname = request.POST.get('todoname')
        todopriority = request.POST.get('todopriority')
        response_data = {}

        t = Todo(id=todoid, name=todoname, priority=todopriority)
        t.save()

        response_data['result'] = 'Create post successful!'
        response_data['todoid'] = t.pk
        response_data['todoname'] = t.name
        response_data['todopriority'] = t.priority

        return HttpResponse(
            json.dumps(response_data),
            content_type="application/json"
        )
    else:
        return HttpResponse(
            json.dumps({"nothing to see": "this isn't happening"}),
            content_type="application/json"
        )