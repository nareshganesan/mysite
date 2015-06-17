# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CompletedTodo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.CharField(blank=True, max_length=400)),
                ('priority', models.CharField(choices=[(b'high', b'high'), (b'medium', b'medium'), (b'low', b'low'), (b'severe', b'severe')], default=b'low', max_length=2)),
                ('notes', models.CharField(blank=True, max_length=300)),
                ('tags', models.CharField(blank=True, max_length=100)),
                ('project', models.CharField(blank=True, max_length=200)),
                ('email', models.CharField(blank=True, max_length=100)),
                ('phone_number', models.CharField(blank=True, max_length=12)),
                ('address', models.CharField(blank=True, max_length=200)),
                ('user', models.ForeignKey(default=1, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='DeletedTodo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.CharField(blank=True, max_length=400)),
                ('priority', models.CharField(choices=[(b'high', b'high'), (b'medium', b'medium'), (b'low', b'low'), (b'severe', b'severe')], default=b'low', max_length=2)),
                ('notes', models.CharField(blank=True, max_length=300)),
                ('tags', models.CharField(blank=True, max_length=100)),
                ('project', models.CharField(blank=True, max_length=200)),
                ('email', models.CharField(blank=True, max_length=100)),
                ('phone_number', models.CharField(blank=True, max_length=12)),
                ('address', models.CharField(blank=True, max_length=200)),
                ('user', models.ForeignKey(default=1, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.CharField(blank=True, max_length=400)),
                ('priority', models.CharField(choices=[(b'high', b'high'), (b'medium', b'medium'), (b'low', b'low'), (b'severe', b'severe')], default=b'low', max_length=2)),
                ('notes', models.CharField(blank=True, max_length=300)),
                ('tags', models.CharField(blank=True, max_length=100)),
                ('project', models.CharField(blank=True, max_length=200)),
                ('email', models.CharField(blank=True, max_length=100)),
                ('phone_number', models.CharField(blank=True, max_length=12)),
                ('address', models.CharField(blank=True, max_length=200)),
                ('user', models.ForeignKey(default=1, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
