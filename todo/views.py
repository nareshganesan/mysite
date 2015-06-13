from django.shortcuts import render, render_to_response, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.http import Http404
from django.template import RequestContext
from django.core.urlresolvers import reverse

from todo.forms import TodoForm

import json

from .models import Todo

# Create your views here.


def todolist(request):
    latest_todo_list = Todo.objects.order_by('-priority')[:10]
    context = {'latest_todo_list': latest_todo_list}
    return render(request, 'todo/index.html', context)


def tododetail(request, todo_id):
    try:
        todo = Todo.objects.get(pk=todo_id)
    except Todo.DoesNotExist:
        raise Http404("Todo does not exist.")
    return render(request, 'todo/detail.html', {'todo': todo})


def quickedit_todo(request):
    if request.method == 'POST':
        todoid = request.POST.get('todoid')
        todoname = request.POST.get('todoname')
        todopriority = request.POST.get('todopriority')
        response_data = {}

        t = Todo(id=todoid, name=todoname, priority=todopriority)
        t.save()

        response_data['result'] = 'Update Todo successful!'
        response_data['todoid'] = t.pk
        response_data['todoname'] = t.name
        response_data['todopriority'] = t.priority

        return HttpResponse(
            json.dumps(response_data),
            content_type="application/json"
        )
    else:
        return HttpResponse(
            json.dumps({"No Data": "Are you kidding me !! :)"}),
            content_type="application/json"
        )


def create_todo(request):
    # Get the context from the request.
    context = RequestContext(request)

    # A HTTP POST?
    if request.method == 'POST':
        form = TodoForm(request.POST)

        # Have we been provided with a valid form?
        if form.is_valid():
            # Save the new todo to the database.
            form.save(commit=True)

            # Now call the index() view.
            # The user will be shown the homepage.
            return HttpResponseRedirect(reverse('todo:index'))
        else:
            # The supplied form contained errors - just print them to the terminal.
            print form.errors
    else:
        # If the request was not a POST, display the form to enter details.
        form = TodoForm()

    # Bad form (or form details), no form supplied...
    # Render the form with error messages (if any).
    return render_to_response('todo/add_todo.html', {'form': form}, context)

def remove_todo(request, todo_id):
    todo = get_object_or_404(Todo, pk=todo_id)
    template_name = 'todo/todo_confirm_delete.html'
    if request.method == 'POST':
        todo.delete()
        return HttpResponseRedirect(reverse('todo:index'))
    return render(request, template_name, {'object' : todo.name})
