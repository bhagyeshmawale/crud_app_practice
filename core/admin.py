from django.contrib import admin
from .models import FormVirsion
# Register your models here.
@admin.register(FormVirsion)
class FormVirsion(admin.ModelAdmin):
    list_display = ['form_version_id','form_version_nm','form_version_cd']
