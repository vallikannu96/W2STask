from django.contrib.auth.models import Group
from rest_framework import serializers
from users.models import TaskUsers


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = TaskUsers
        fields = ('id', 'first_name', 'last_name', 'email', 'user_type', 'role_id', 'is_superuser', 'created_at')
