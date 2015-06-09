# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CompletedTodo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.CharField(blank=True, max_length=400)),
                ('priority', models.CharField(max_length=8)),
                ('notes', models.CharField(blank=True, max_length=300)),
                ('tags', models.CharField(blank=True, max_length=100)),
                ('project', models.CharField(blank=True, max_length=200)),
                ('email', models.CharField(blank=True, max_length=100)),
                ('phone_number', models.CharField(blank=True, max_length=12)),
                ('address', models.CharField(blank=True, max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='DeletedTodo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.CharField(blank=True, max_length=400)),
                ('priority', models.CharField(max_length=8)),
                ('notes', models.CharField(blank=True, max_length=300)),
                ('tags', models.CharField(blank=True, max_length=100)),
                ('project', models.CharField(blank=True, max_length=200)),
                ('email', models.CharField(blank=True, max_length=100)),
                ('phone_number', models.CharField(blank=True, max_length=12)),
                ('address', models.CharField(blank=True, max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.CharField(blank=True, max_length=400)),
                ('priority', models.CharField(max_length=8)),
                ('notes', models.CharField(blank=True, max_length=300)),
                ('tags', models.CharField(blank=True, max_length=100)),
                ('project', models.CharField(blank=True, max_length=200)),
                ('email', models.CharField(blank=True, max_length=100)),
                ('phone_number', models.CharField(blank=True, max_length=12)),
                ('address', models.CharField(blank=True, max_length=200)),
            ],
        ),
    ]
