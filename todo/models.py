import datetime

from django.db import models
from django.utils import timezone

# Create your models here.

class Todo(models.Model):
    name = models.CharField(max_length=200, blank=False)
    description = models.CharField(max_length=400, blank=True)
    priority = models.CharField(max_length=8, blank=False)
    notes = models.CharField(max_length=300, blank=True)
    tags = models.CharField(max_length=100, blank=True)
    project = models.CharField(max_length=200, blank=True)
    email = models.CharField(max_length=100, blank=True)
    phone_number = models.CharField(max_length=12, blank=True)
    address = models.CharField(max_length=200, blank=True)

    def __str__(self):
		return self.name + " priority : "+self.priority


class CompletedTodo(models.Model):
    name = models.CharField(max_length=200, blank=False)
    description = models.CharField(max_length=400, blank=True)
    priority = models.CharField(max_length=8, blank=False)
    notes = models.CharField(max_length=300, blank=True)
    tags = models.CharField(max_length=100, blank=True)
    project = models.CharField(max_length=200, blank=True)
    email = models.CharField(max_length=100, blank=True)
    phone_number = models.CharField(max_length=12, blank=True)
    address = models.CharField(max_length=200, blank=True)

    def __str__(self):
		return self.name + " priority : "+self.priority


class DeletedTodo(models.Model):
    name = models.CharField(max_length=200, blank=False)
    description = models.CharField(max_length=400, blank=True)
    priority = models.CharField(max_length=8, blank=False)
    notes = models.CharField(max_length=300, blank=True)
    tags = models.CharField(max_length=100, blank=True)
    project = models.CharField(max_length=200, blank=True)
    email = models.CharField(max_length=100, blank=True)
    phone_number = models.CharField(max_length=12, blank=True)
    address = models.CharField(max_length=200, blank=True)

    def __str__(self):
		return self.name + " priority : "+self.priority