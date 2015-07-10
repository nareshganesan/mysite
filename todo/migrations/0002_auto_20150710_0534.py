# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='completed_date',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2015, 7, 10, 5, 34, 57, 880692)),
        ),
        migrations.AlterField(
            model_name='todo',
            name='created_date',
            field=models.DateTimeField(default=datetime.datetime(2015, 7, 10, 5, 34, 57, 880652)),
        ),
    ]
