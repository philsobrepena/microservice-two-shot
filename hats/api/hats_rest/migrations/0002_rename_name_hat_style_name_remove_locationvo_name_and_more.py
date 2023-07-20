# Generated by Django 4.0.3 on 2023-07-20 18:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hats_rest', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='hat',
            old_name='name',
            new_name='style_name',
        ),
        migrations.RemoveField(
            model_name='locationvo',
            name='name',
        ),
        migrations.AddField(
            model_name='hat',
            name='location',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='hats', to='hats_rest.locationvo'),
        ),
        migrations.AddField(
            model_name='locationvo',
            name='closet_name',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='locationvo',
            name='section_number',
            field=models.PositiveSmallIntegerField(null=True),
        ),
        migrations.AddField(
            model_name='locationvo',
            name='shelf_number',
            field=models.PositiveSmallIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='hat',
            name='color',
            field=models.CharField(max_length=200),
        ),
    ]
