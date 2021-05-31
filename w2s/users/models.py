from django.contrib.auth.models import AbstractUser, Group
from django.core.validators import validate_comma_separated_integer_list
from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.conf import settings

USER_TYPE_CHOICES = (
    ('S', 'Superuser'),
    ('M', 'Manager'),
    ('W', 'Employee'),
)

# Create your models here.
class TaskUsers(AbstractUser):
    username = models.CharField(max_length=255, unique=False)
    email = models.EmailField(max_length=255, unique=True, verbose_name='email address')
    user_type = models.CharField(max_length=100, choices=USER_TYPE_CHOICES, default=0)
    role_id = models.CharField(max_length=100, validators=[validate_comma_separated_integer_list], null=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='user_created_by', on_delete=models.CASCADE,
                                   editable=False, default=None, null=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='user_updated_by', on_delete=models.CASCADE,
                                   default=None, null=True)
    updated_at = models.DateTimeField(default=None, null=True)
    is_deleted = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

class Roles(models.Model):
    group = models.OneToOneField(Group, related_name='details', on_delete=models.CASCADE)
    alias = models.CharField(max_length=50)
    accesses = models.TextField(null=True)
    description = models.TextField(null=True)
    is_active = models.BooleanField(default=1)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='roles_created_by', on_delete=models.CASCADE,
                                   editable=False, default=None, null=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='roles_updated_by', on_delete=models.CASCADE,
                                   default=None, null=True)
    updated_at = models.DateTimeField(default=None, null=True)




