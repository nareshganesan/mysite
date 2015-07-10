# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0004_auto_20150710_0535'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='completed_date',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2015, 7, 10, 5, 36, 27, 442251)),
        ),
        migrations.AlterField(
            model_name='todo',
            name='created_date',
            field=models.DateTimeField(default=datetime.datetime(2015, 7, 10, 5, 36, 27, 442214)),
        ),
    ]
