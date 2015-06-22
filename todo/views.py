from django.contrib.auth.decorators import login_required
from django.shortcuts import render, render_to_response, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.http import Http404
from django.template import RequestContext
from django.core.urlresolvers import reverse

from todo.forms import TodoForm

import json

from .models import Todo

# Create your views here.

@login_required
def todolist(request):
    'list view of the todo app.'
    latest_todo_list = Todo.objects.filter(user=request.user.id).order_by('-priority')[:25]
    prioritylist = Todo.PRIORITY_LIST
    context = {
        'latest_todo_list': latest_todo_list,
        'prioritylist': prioritylist,
    }
    return render(request, 'todo/index.html', context)

@login_required
def tododetail(request, todo_id):
    'detailed view of a individual todo.'
    try:
        todo = Todo.objects.filter(user=request.user.id).get(pk=todo_id)
    except Todo.DoesNotExist:
        raise Http404("Todo does not exist.")
    return render(request, 'todo/detail.html', {'todo': todo})

@login_required
def edit_todo(request):
    'detailed view of a individual todo.'
    if request.method == 'POST':

        todoid = request.POST.get('todoid')
        todoname = request.POST.get('todoname')
        todopriority = request.POST.get('todopriority')
        tododescription = request.POST.get('tododescription')
        todonotes = request.POST.get('todonotes')
        todotags = request.POST.get('todotags')
        todoproject = request.POST.get('todoproject')
        todoemail = request.POST.get('todoemail')
        todophone = request.POST.get('todophone')
        todoaddress = request.POST.get('todoaddress')
        todouser = request.user.id

        updatedtodo = Todo(id=todoid, name=todoname, description=tododescription,
                 priority=todopriority, notes=todonotes, tags=todotags,
                 project=todoproject, email=todoemail, phone_number=todophone,
                 address=todoaddress, user_id=todouser)
        updatedtodo.save()

        response_data = {}
        todo = Todo.objects.filter(user=todouser).get(pk=todoid)
        todoname = todo.name
        todopriority = todo.priority

        tododescription = todo.description
        todonotes = todo.notes
        todotags = todo.tags
        todoproject = todo.project
        todoemail = todo.email
        todophone_number = todo.phone_number
        todoaddress = todo.address

        response_data['todoid'] = todoid
        response_data['todoname'] = todoname
        response_data['todopriority'] = todopriority
        response_data['todouser'] = todouser
        response_data['tododescription'] = tododescription
        response_data['todonotes'] = todonotes
        response_data['todotags'] = todotags
        response_data['todoproject'] = todoproject
        response_data['todoemail'] = todoemail
        # Phone number Model field(phone_number) & View parameter(phone) are different
        response_data['todophone'] = todophone_number
        response_data['todoaddress'] = todoaddress

        return HttpResponse(
            json.dumps(response_data),
            content_type="application/json"
        )

    else:
        return HttpResponse(
            json.dumps({"No Data": "Are you kidding me !! :)"}),
            content_type="application/json"
        )

@login_required
def quickdetail_todo(request):
    'detailed view of a individual todo.'
    if request.method == 'POST':

        todoid = request.POST.get('todoid')
        todouser = request.user.id
        response_data = {}
        todo = Todo.objects.filter(user=todouser).get(pk=todoid)
        todoname = todo.name
        todopriority = todo.priority

        tododescription = todo.description
        todonotes = todo.notes
        todotags = todo.tags
        todoproject = todo.project
        todoemail = todo.email
        todophone_number = todo.phone_number
        todoaddress = todo.address

        response_data['todoid'] = todoid
        response_data['todoname'] = todoname
        response_data['todopriority'] = todopriority
        response_data['todouser'] = todouser
        response_data['tododescription'] = tododescription
        response_data['todonotes'] = todonotes
        response_data['todotags'] = todotags
        response_data['todoproject'] = todoproject
        response_data['todoemail'] = todoemail
        response_data['todophone_number'] = todophone_number
        response_data['todoaddress'] = todoaddress

        return HttpResponse(
            json.dumps(response_data),
            content_type="application/json"
        )

    else:
        return HttpResponse(
            json.dumps({"No Data": "Are you kidding me !! :)"}),
            content_type="application/json"
        )

@login_required
def quickedit_todo(request):
    'edit a individual todo.'
    if request.method == 'POST':
        todoid = request.POST.get('todoid')
        todoname = request.POST.get('todoname')
        todopriority = request.POST.get('todopriority')
        todouser = request.user.id
        print todouser
        response_data = {}

        t = Todo(id=todoid, name=todoname, priority=todopriority, user_id=todouser)
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

@login_required
def quickadd_todo(request):
    'add an individual todo.'
    if request.method == 'POST':
        todoname = request.POST.get('todoname')
        todopriority = request.POST.get('todopriority')
        tododescription = request.POST.get('tododescription')
        todouser = request.user.id
        print todouser
        response_data = {}

        t = Todo(name=todoname, priority=todopriority, user_id=todouser, description=tododescription)
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


@login_required
def create_todo(request):
    'Create a individual todo.'
    # Get the context from the request.
    context = RequestContext(request)

    # A HTTP POST?
    if request.method == 'POST':
        form = TodoForm(request.POST)

        # Have we been provided with a valid form?
        if form.is_valid():
            # Save the new todo to the database.
            newtodo = form.save(commit=True)
            newtodo.user = request.user
            newtodo.save()

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

@login_required
def remove_todo(request, todo_id):
    'delete an individual todo.'
    todo = get_object_or_404(Todo, pk=todo_id)
    template_name = 'todo/todo_confirm_delete.html'
    if request.method == 'POST':
        todo.delete()
        return HttpResponseRedirect(reverse('todo:index'))
    return render(request, template_name, {'object' : todo.name})

@login_required
def quickdelete_todo(request):
    'delete an individual todo.'
    if request.method == 'POST':
        todoid = request.POST.get('todoid')
        todo = get_object_or_404(Todo, pk=todoid)
        todo.delete()
        return HttpResponseRedirect(reverse('todo:index'))
    return HttpResponseRedirect(reverse('todo:index'))




def home(request):
	return render(request, 'todo/home.html')