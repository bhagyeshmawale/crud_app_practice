from django.db import models

# Create your models here.

class FormVirsion(models.Model):
    form_version_id = models.CharField(max_length=60)
    form_version_nm = models.CharField(max_length=100)
    form_version_cd = models.CharField(max_length=50)

