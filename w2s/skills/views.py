from django.shortcuts import render
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from django.utils import timezone
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import SkillsSerializer, EmployeeSkillSerializer
from .models import Skills, EmployeeSkills
from users.models import TaskUsers

UN_AUTHENTICATED_METHODS = []

# Create your views here.
class SkillsViewSet(viewsets.ModelViewSet):
    queryset = Skills.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = SkillsSerializer

    def list(self, request, *args, **kwargs):
        skills = Skills.objects.filter(is_deleted=False)
        skills = self.serializer_class(skills, many=True).data
        count = len(skills)
        return Response({"skills": skills, "count": count})

    def create(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        skill = Skills()
        skill.name = data['name']
        skill.description = data['description']
        skill.created_by = user
        skill.save()
        return Response({'status': True, 'message': 'skill created'}, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True, url_path='delete-skill')
    def delete_skill(self, request, pk):
        user = request.user
        skill = Skills.objects.get(id=pk)
        skill.is_deleted = True
        skill.updated_at = timezone.now()
        skill.updated_by = user
        skill.save(update_fields=['is_deleted', 'updated_by', 'updated_at'])
        return Response(True)

    @action(methods=['post'], detail=True, url_path='edit-skill')
    def edit_skill(self, request, pk):
        data = request.data
        user = request.user
        skill = Skills.objects.get(id=pk)
        skill.name = data['name']
        skill.description = data['description']
        skill.updated_by = user
        user.updated_at = timezone.now()
        skill.save(update_fields=['name', 'description', 'percentage', 'updated_by', 'updated_at'])
        return Response({'status': True, 'message': 'user updated'}, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, url_path='list-employee-skills')
    def list_employee_skills(self, request):
        user = request.user
        skills = EmployeeSkills.objects.filter(is_deleted=False, user=user).values('id', 'percentage', 'skill__name')
        count = len(skills)
        return Response({"skills": skills, "count": count})

    @action(methods=['post'], detail=False, url_path='add-employee-skill')
    def add_employee_skill(self, request):
        data = request.data
        user = request.user
        skill = EmployeeSkills()
        skill.skill_id = int(data['skill'])
        skill.percentage = data['percentage']
        skill.user = user
        skill.created_by = user
        skill.save()
        return Response({'status': True, 'message': 'Employee skill created'}, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path='edit-employee-skill')
    def edit_employee_skill(self, request, pk):
        data = request.data
        user = request.user
        skill = EmployeeSkills.objects.get(id=pk)
        skill.skill_id = data['skill']
        skill.percentage = data['percentage']
        skill.updated_by = user
        user.updated_at = timezone.now()
        skill.save()
        return Response({'status': True, 'message': 'employee skill updated'}, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True, url_path='delete-employee-skill')
    def delete_employee_skill(self, request, pk):
        user = request.user
        skill = EmployeeSkills.objects.get(id=pk)
        skill.is_deleted = True
        skill.updated_at = timezone.now()
        skill.updated_by = user
        skill.save(update_fields=['is_deleted', 'updated_by', 'updated_at'])
        return Response(True)

    @action(methods=['get'], detail=False, url_path='get-employee-list')
    def get_employee_list(self, request):
        employees = TaskUsers.objects.filter(user_type='E').values('id', 'first_name', 'last_name')
        return Response({'status': True, 'employees': employees}, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True, url_path='get-dashboard-data')
    def get_dashboard_data(self, request, pk):
        labels = list()
        values = list()
        skills = EmployeeSkills.objects.filter(is_deleted=False, user_id=pk).values('percentage', 'skill__name')
        for item in skills:
            labels.append(item['skill__name'])
            values.append(item['percentage'])
        return Response({'status': True, "labels" : labels, "values" : values }, status=status.HTTP_200_OK)
