# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0002_auto_20150617_0502'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='completed_date',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2015, 6, 27, 13, 13, 15, 210522)),
        ),
        migrations.AddField(
            model_name='todo',
            name='created_date',
            field=models.DateTimeField(default=datetime.datetime(2015, 6, 27, 13, 13, 15, 210428)),
        ),
        migrations.AddField(
            model_name='todo',
            name='iscompleted',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='todo',
            name='isdeleted',
            field=models.BooleanField(default=False),
        ),
    ]
