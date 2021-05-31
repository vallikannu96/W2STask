from django.contrib.auth.models import Group
from rest_framework import serializers
from skills.models import Skills
from users.serializers import UserSerializer

class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = ('id', 'name', 'description')

class EmployeeSkillSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    skill = SkillsSerializer(read_only=True)
    class Meta:
        model = Skills
        fields = ('id', 'user', 'percentage', 'user')
