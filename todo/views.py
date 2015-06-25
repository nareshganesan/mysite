from django.contrib.auth.decorators import login_required
from django.shortcuts import render, render_to_response, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.http import Http404
from django.template import RequestContext
from django.core.urlresolvers import reverse

from django.db.models import Count

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
def quickdelete_todo(request):
    'delete an individual todo.'
    if request.method == 'POST':
        todoid = request.POST.get('todoid')
        todo = get_object_or_404(Todo, pk=todoid)
        todo.delete()
        return HttpResponseRedirect(reverse('todo:index'))
    return HttpResponseRedirect(reverse('todo:index'))

@login_required
def todo_reports(request):
    'View Todo\'s as a report in terms of Completion rate, priority completion rate.'
    if request.method == 'GET':
        data = {
            'priority': [],
            'values': []
        }
        report = Todo.objects.values('priority').annotate(Count('id'))
        for priorityType in report:
            priority = priorityType['priority']
            prioritycount = priorityType['id__count']
            data['priority'].append(priority)
            data['values'].append(prioritycount)

        return HttpResponse(
            json.dumps(data),
            content_type="application/json"
        )
    else:
        return HttpResponse(
            json.dumps({"No Report Data": "Are you kidding me !! :)"}),
            content_type="application/json"
        )

@login_required
def reports(request):
    return render(request, 'todo/reports.html')

def home(request):
	return render(request, 'todo/home.html')