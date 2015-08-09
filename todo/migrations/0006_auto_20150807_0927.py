# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0005_auto_20150710_0536'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='reminder_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='todo',
            name='reminder_frequency',
            field=models.CharField(blank=True, choices=[(b'daily', b'daily'), (b'weekly', b'weekly'), (b'monthly', b'monthly'), (b'bimonthly', b'bimonthly'), (b'quarterly', b'quarterly'), (b'halfyearly', b'halfyearly'), (b'yearly', b'yearly'), (b'select', b'select')], default=b'select', max_length=10),
        ),
        migrations.AlterField(
            model_name='todo',
            name='completed_date',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2015, 8, 7, 9, 27, 6, 529212)),
        ),
        migrations.AlterField(
            model_name='todo',
            name='created_date',
            field=models.DateTimeField(default=datetime.datetime(2015, 8, 7, 9, 27, 6, 529169)),
        ),
    ]
