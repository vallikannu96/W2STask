from django.db import models
from django.conf import settings

# Create your models here.
class Skills(models.Model):
    name = models.CharField(max_length=25)
    description = models.TextField()
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='skill_created_by', on_delete=models.CASCADE,
                                   editable=False, default=None, null=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='skill_updated_by', on_delete=models.CASCADE,
                                   default=None, null=True)
    updated_at = models.DateTimeField(default=None, null=True)
    is_deleted = models.BooleanField(default=False)

class EmployeeSkills(models.Model):
    skill = models.ForeignKey(Skills, related_name='employee_skill', on_delete=models.CASCADE,
                                   editable=True, default=None, null=True)
    percentage = models.FloatField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='users_skill', on_delete=models.CASCADE,
                                   editable=True, default=None, null=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='employee_skill_created_by', on_delete=models.CASCADE,
                                   editable=False, default=None, null=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='employee_skill_updated_by', on_delete=models.CASCADE,
                                   default=None, null=True)
    updated_at = models.DateTimeField(default=None, null=True)
    is_deleted = models.BooleanField(default=False)