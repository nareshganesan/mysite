import datetime
from django.forms import forms
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.

class Todo(models.Model):
    HIGH = 'high'
    LOW = 'low'
    MEDIUM = 'medium'
    SEVERE = 'severe'
    PRIORITY_LIST = (
        (HIGH, 'high'),
        (MEDIUM, 'medium'),
        (LOW, 'low'),
        (SEVERE, 'severe'),
    )
    name = models.CharField(max_length=200, blank=False)
    description = models.CharField(max_length=400, blank=True)
    priority = models.CharField(max_length=6, choices = PRIORITY_LIST, default = LOW,  blank=False)
    notes = models.CharField(max_length=300, blank=True)
    tags = models.CharField(max_length=100, blank=True)
    project = models.CharField(max_length=200, blank=True)
    email = models.CharField(max_length=100, blank=True)
    phone_number = models.CharField(max_length=12, blank=True)
    address = models.CharField(max_length=200, blank=True)
    user = models.ForeignKey(User, default=1)

    def __str__(self):
		return unicode(self.name + " priority : "+self.priority)


class CompletedTodo(models.Model):
    HIGH = 'high'
    LOW = 'low'
    MEDIUM = 'medium'
    SEVERE = 'severe'
    PRIORITY_LIST = (
        (HIGH, 'high'),
        (MEDIUM, 'medium'),
        (LOW, 'low'),
        (SEVERE, 'severe'),
    )
    name = models.CharField(max_length=200, blank=False)
    description = models.CharField(max_length=400, blank=True)
    priority = models.CharField(max_length=6, choices = PRIORITY_LIST, default = LOW,  blank=False)
    notes = models.CharField(max_length=300, blank=True)
    tags = models.CharField(max_length=100, blank=True)
    project = models.CharField(max_length=200, blank=True)
    email = models.CharField(max_length=100, blank=True)
    phone_number = models.CharField(max_length=12, blank=True)
    address = models.CharField(max_length=200, blank=True)
    user = models.ForeignKey(User, default=1)

    def __str__(self):
		return unicode(self.name + " priority : "+self.priority)


class DeletedTodo(models.Model):
    HIGH = 'high'
    LOW = 'low'
    MEDIUM = 'medium'
    SEVERE = 'severe'
    PRIORITY_LIST = (
        (HIGH, 'high'),
        (MEDIUM, 'medium'),
        (LOW, 'low'),
        (SEVERE, 'severe'),
    )
    name = models.CharField(max_length=200, blank=False)
    description = models.CharField(max_length=400, blank=True)
    priority = models.CharField(max_length=6, choices = PRIORITY_LIST, default = LOW,  blank=False)
    notes = models.CharField(max_length=300, blank=True)
    tags = models.CharField(max_length=100, blank=True)
    project = models.CharField(max_length=200, blank=True)
    email = models.CharField(max_length=100, blank=True)
    phone_number = models.CharField(max_length=12, blank=True)
    address = models.CharField(max_length=200, blank=True)
    user = models.ForeignKey(User, default=1)

    def __str__(self):
		return unicode(self.name + " priority : "+self.priority)