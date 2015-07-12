from django.contrib.auth.decorators import login_required
from django.shortcuts import render, render_to_response, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.http import Http404
from django.template import RequestContext
from django.core.urlresolvers import reverse
from django.db.models import Q
from django.core import serializers
from datetime import datetime, time

from django.db.models import Count

from todo.forms import TodoForm

import json

from .models import Todo

# Create your views here.

@login_required
def todolist(request):
    'list view of the todo app.'
    latest_todo_list = Todo.objects.filter(user=request.user.id).filter(iscompleted=False).filter(isdeleted=False).order_by('-created_date')[:25]
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
        print updatedtodo
        updatedtodo.save()

        response_data = dict()
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
        response_data = dict()
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
        response_data = dict()

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
        response_data = dict()

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
def add_todo(request):
    'add an individual todo.'
    if request.method == 'POST':
        todoname = request.POST.get('todoname')
        todopriority = request.POST.get('todopriority')
        tododescription = request.POST.get('tododescription')
        todouser = request.user.id
        todonotes = request.POST.get('todonotes')
        todotags = request.POST.get('todotags')
        todoproject = request.POST.get('todoproject')
        todoemail = request.POST.get('todoemail')
        todophonenumber = request.POST.get('todophonenumber')
        todoaddress = request.POST.get('todoaddress')
        response_data = dict()

        t = Todo(name=todoname, priority=todopriority, user_id=todouser, description=tododescription,
                 notes=todonotes, tags=todotags, project=todoproject, email=todoemail,
                 phone_number=todophonenumber, address=todoaddress)
        t.save()

        response_data['result'] = 'Update Todo successful!'
        response_data['todoid'] = t.pk
        response_data['todoname'] = t.name
        response_data['todopriority'] = t.priority
        response_data['tododescription'] = t.description
        response_data['todonotes'] = t.notes
        response_data['todotags'] = t.tags
        response_data['todoproject'] = t.project
        response_data['todoemail'] = t.email
        response_data['todophonenumber'] = t.phone_number
        response_data['todoaddress'] = t.address

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
def mark_as_completed(request):
    'Mark a todo as Completed.'
    if request.method == 'POST':
        todoid = request.POST.get('todoid')
        todo = get_object_or_404(Todo, pk=todoid)
        todo.iscompleted = True
        todo.save()
        response_data = dict()
        response_data['responsetype'] = 'success'
        return HttpResponse(
            json.dumps(response_data),
            content_type="application/json"
        )
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
        todo.isdeleted = True
        todo.save()
        return HttpResponseRedirect(reverse('todo:index'))
    return HttpResponseRedirect(reverse('todo:index'))

@login_required
def completed_todolist(request):
    'List of Completed Todo\'s.'
    completed_todo_list = Todo.objects.filter(user=request.user.id).filter(iscompleted=True).filter(isdeleted=False).order_by('-priority')[:25]
    prioritylist = Todo.PRIORITY_LIST
    response_data = dict()
    response_datarootkey = "completed_todo_list"
    response_data[response_datarootkey] = []

    for todo in completed_todo_list:
        response_data[response_datarootkey].append({
            'id': todo.id,
            'name': todo.name,
            'description': todo.description,
            'priority': todo.priority
        })
    return HttpResponse(
        json.dumps(response_data[response_datarootkey]),
        content_type="application/json"
    )

@login_required
def deleted_todolist(request):
    'List of Deleted Todo\'s.'
    deleted_todo_list = Todo.objects.filter(user=request.user.id).filter(isdeleted=True).order_by('-priority')[:25]
    prioritylist = Todo.PRIORITY_LIST
    response_data = dict()
    response_datarootkey = "deleted_todo_list"
    response_data[response_datarootkey] = []

    for todo in deleted_todo_list:
        response_data[response_datarootkey].append({
            'id': todo.id,
            'name': todo.name,
            'description': todo.description,
            'priority': todo.priority
        })
    return HttpResponse(
        json.dumps(response_data[response_datarootkey]),
        content_type="application/json"
    )


@login_required
def todo_reports(request):
    'View Todo\'s as a report in terms of Completion rate, priority completion rate.'
    if request.method == 'GET':
        prioritylist = {
            'severe' : 0,
            'high' : 1,
            'medium' : 2,
            'low' : 3
        }
        data = {
            'priority': [0] * len(prioritylist),
            'values': {
                'todo': [0] * len(prioritylist),
                'completedtodo': [0] * len(prioritylist),
                'deletedtodo': [0] * len(prioritylist)
            }
        }

        todoreport = Todo.objects.values('priority').annotate(Count('id'))
        completedreport =Todo.objects.filter(iscompleted=True).filter(isdeleted=False).\
            values('priority').annotate(Count('id'))
        deletedreport =Todo.objects.filter(isdeleted=True).\
            values('priority').annotate(Count('id'))

        for priority in prioritylist:
            data['priority'][prioritylist[priority]] = priority

        for priorityType in todoreport:
            priority = priorityType['priority']
            prioritycount = priorityType['id__count']
            data['values']['todo'][prioritylist[priority]] = prioritycount

        for priorityType in completedreport:
            priority = priorityType['priority']
            prioritycount = priorityType['id__count']
            data['values']['completedtodo'][prioritylist[priority]] = prioritycount

        for priorityType in deletedreport:
            priority = priorityType['priority']
            prioritycount = priorityType['id__count']
            data['values']['deletedtodo'][prioritylist[priority]] = prioritycount

        return HttpResponse(
            json.dumps(data),
            content_type="application/json"
        )
    if request.method == 'POST':
        startDate = request.POST.get('startDate')
        endDate = request.POST.get('endDate')
        todoType = request.POST.get('todoType')
        if startDate and endDate:
            startDate = datetime.strptime(startDate, '%Y-%m-%d').date()
            endDate = datetime.strptime(endDate, '%Y-%m-%d').date()
            prioritylist = {
                'severe' : 0,
                'high' : 1,
                'medium' : 2,
                'low' : 3
            }
            data = {
                'priority': [None] * len(prioritylist),
                'values': {
                    'todo': [0] * len(prioritylist),
                    'completedtodo': [0] * len(prioritylist),
                    'deletedtodo': [0] * len(prioritylist)
                }
            }

            todoreport = Todo.objects.filter(created_date__range=(
                     datetime.combine(startDate, time.min),
                     datetime.combine(endDate, time.max))).values('priority').annotate(Count('id'))
            completedreport =Todo.objects.filter(iscompleted=True).filter(isdeleted=False).\
                 filter(created_date__range=(datetime.combine(startDate, time.min), datetime.combine(endDate, time.min)))\
                 .values('priority').annotate(Count('id'))
            deletedreport =Todo.objects.filter(isdeleted=True).\
                 filter(created_date__range=(datetime.combine(startDate, time.min), datetime.combine(endDate, time.min)))\
                 .values('priority').annotate(Count('id'))

            for priority in prioritylist:
                data['priority'][prioritylist[priority]] = priority

            for priorityType in todoreport:
                priority = priorityType['priority']
                prioritycount = priorityType['id__count']
                data['values']['todo'][prioritylist[priority]] = prioritycount

            for priorityType in completedreport:
                priority = priorityType['priority']
                prioritycount = priorityType['id__count']
                data['values']['completedtodo'][prioritylist[priority]] = prioritycount

            for priorityType in deletedreport:
                priority = priorityType['priority']
                prioritycount = priorityType['id__count']
                data['values']['deletedtodo'][prioritylist[priority]] = prioritycount

            print "Todo Report : " + str(todoreport)
            print "Completed Todo Report : " + str(completedreport)
            print "Deleted Todo Report : " + str(deletedreport)

            return HttpResponse(
                json.dumps(data),
                content_type="application/json"
            )
        else:
            return HttpResponse(
                json.dumps({"No Report Data": "Are you kidding me !! :)"}),
                content_type="application/json"
            )

    else:
        return HttpResponse(
            json.dumps({"No Report Data": "Are you kidding me !! :)"}),
            content_type="application/json"
        )

@login_required
def todo_search(request):
    'Search Todo on any dimension available in the app.'
    if request.method == 'POST':

        searchquery = request.POST.get('searchQuery')
        if searchquery is not None:
            searchresults = Todo.objects.filter(
                Q( name__icontains = searchquery ) |
                Q( description__icontains = searchquery ) |
                Q( notes__icontains = searchquery ) |
                Q( tags__icontains = searchquery ) |
                Q( project__icontains = searchquery ) |
                Q( email__icontains = searchquery ) |
                Q( phone_number__icontains = searchquery ) |
                Q( address__icontains = searchquery )

            ).order_by('priority')

            # data = serializers.serialize('json', searchresults, fields=('name','description'))

            response_data = dict()
            response_datarootkey = "searchresults"
            response_data[response_datarootkey] = []
            resultscount = 0
            for result in searchresults:
                response_data[response_datarootkey].append({
                    'id': result.id,
                    'name': result.name,
                    'description': result.description,
                    'priority': result.priority
                })
            return HttpResponse(
                json.dumps(response_data[response_datarootkey]),
                content_type="application/json"
            )

    else:
        return HttpResponse(
            json.dumps({"No Data": "Use a better search term!!!"}),
            content_type="application/json"
        )



@login_required
def reports(request):
    return render(request, 'todo/reports.html')

def home(request):
	return render(request, 'todo/home.html')

def todo_tab_test(request):
    return render(request, 'todo/tabstest.html')