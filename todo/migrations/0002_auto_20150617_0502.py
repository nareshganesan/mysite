# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='completedtodo',
            name='priority',
            field=models.CharField(choices=[(b'high', b'high'), (b'medium', b'medium'), (b'low', b'low'), (b'severe', b'severe')], default=b'low', max_length=6),
        ),
        migrations.AlterField(
            model_name='deletedtodo',
            name='priority',
            field=models.CharField(choices=[(b'high', b'high'), (b'medium', b'medium'), (b'low', b'low'), (b'severe', b'severe')], default=b'low', max_length=6),
        ),
        migrations.AlterField(
            model_name='todo',
            name='priority',
            field=models.CharField(choices=[(b'high', b'high'), (b'medium', b'medium'), (b'low', b'low'), (b'severe', b'severe')], default=b'low', max_length=6),
        ),
    ]
