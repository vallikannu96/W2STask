from django.shortcuts import render
from django.contrib.auth.models import Group
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from django.utils import timezone
from rest_framework.permissions import IsAuthenticated, AllowAny
from users.serializers import UserSerializer
from users.models import TaskUsers
from w2s.defaults import TaskDefaults
from common import validators
from common.exception_handlers import ServerError

UN_AUTHENTICATED_METHODS = []


# JWT response payload handler
def jwt_response_payload_handler(token, user=None, request=None):

    user_details = UserSerializer(user, context={'request': request}).data
    user_details['accesses'] = list()
    if user.is_superuser:
        user_details['accesses'] = TaskDefaults.get_predefined_role_access_specifiers('Superuser')
    else:
        access_joined = user.groups.all().values_list('details__accesses', flat=True)
        for string in access_joined:
            if string is not None:
                user_details['accesses'] += string.split(',')
        user_details['accesses'] = list(set(user_details['accesses']))

    user_details['accesses'] = sorted(user_details['accesses'])
    if user_details['user_type'] == 'E':
        user_details['user_type'] = 'Employee'
    elif user_details['user_type'] == 'M':
        user_details['user_type'] = 'Manager'
    else:
        user_details['user_type'] = 'Superuser'

    return {
        'token': token,
        'user': user_details
    }

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = TaskUsers.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in UN_AUTHENTICATED_METHODS:
            return (AllowAny(),)
        return (IsAuthenticated(),)

    def create(self, request, *args, **kwargs):
        user_data = request.data
        user = request.user
        user_instance = TaskUsers()
        try:
            # email validation
            if validators.email_validator(user_data['email'], user_instance._meta.get_field('email').max_length):
                user_instance.email = user_data['email']
                user_instance.username = user_data['email']
            else:
                return Response({ 'status': 'warning', 'message': 'Email not valid' }, status=status.HTTP_406_NOT_ACCEPTABLE)

            # first name validation
            if validators.name_validator(user_data['first_name'],
                                         user_instance._meta.get_field('first_name').max_length):
                user_instance.first_name = user_data['first_name']
            else:
                return Response({ 'status': 'warning', 'message': 'First name not valid' }, status=status.HTTP_406_NOT_ACCEPTABLE)

            # last name validation
            if validators.name_validator(user_data['last_name'], user_instance._meta.get_field('last_name').max_length):
                user_instance.last_name = user_data['last_name']
            else:
                return Response({ 'status': 'warning', 'message': 'Last name not valid' }, status=status.HTTP_406_NOT_ACCEPTABLE)

            user_instance.user_type = user_data['user_type']
            user_instance.created_by_id = user.id
            user_instance.set_password(user_data['password'])
            role_id = ''
            if user_data['user_type'] == 'M':
                roleqs = Group.objects.filter(name='Predefined/Manager').values_list('id', flat=True)
                role_id = str(roleqs[0])
                user_instance.is_admin = True
            elif user_data['user_type'] == 'E':
                roleqs = Group.objects.filter(name='Predefined/Employee').values_list('id', flat=True)
                role_id = str(roleqs[0])
            user_instance.role_id = role_id
            user_instance.save()

            permission_groups = Group.objects.filter(id__in=role_id)
            user_instance.groups.set(permission_groups)
            user_instance.save()
            return Response(True)
        except Exception as e:
            raise ServerError(e.args[0])

    @staticmethod
    def get_user_type(type):
        if type == "M":
            return "Manager"
        elif type == "E":
            return "Employee"
        else:
            return "Superuser"

    @action(methods=['get'], detail=False, url_path='users-list')
    def get_user_list(self, request):
        users = TaskUsers.objects.filter(is_superuser=False, is_deleted=False)
        users = UserSerializer(users, context={'request': request}, many=True).data
        for user in users:
            user['user_type'] = self.get_user_type(user['user_type'])
        count = len(users)
        return Response({'users': users, 'total_count': count})

    @action(methods=['delete'], detail=True, url_path='delete-user')
    def delete_user(self, request, pk):
        update_user = request.user
        user = TaskUsers.objects.get(id=pk)
        user.is_deleted = True
        user.updated_by = update_user
        user.updated_at = timezone.now()
        user.save(update_fields=['is_deleted', 'updated_by', 'updated_at'])
        return Response({'status': True, 'message': 'user deleted'}, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=False, url_path='email-already-exists')
    def email_already_exists(self, request):
        email = request.data['email']
        try:
            if TaskUsers.objects.filter(email=email).exists():
                return Response({'status': 'warning'}, status=status.HTTP_200_OK)
            else:
                return Response({'status': 'success'}, status=status.HTTP_200_OK)
        except Exception as e:
            raise ServerError(e.args[1])

    @action(methods=['post'], detail=True, url_path='edit-user')
    def edit_user(self, request,pk):
        user_data = request.data
        user = request.user
        user_instance = TaskUsers.objects.get(id=pk)
        # first name validation
        if validators.name_validator(user_data['first_name'],
                                     user_instance._meta.get_field('first_name').max_length):
            user_instance.first_name = user_data['first_name']
        else:
            return Response({'status': 'warning', 'message': 'First name not valid'},
                            status=status.HTTP_406_NOT_ACCEPTABLE)

        # last name validation
        if validators.name_validator(user_data['last_name'], user_instance._meta.get_field('last_name').max_length):
            user_instance.last_name = user_data['last_name']
        else:
            return Response({'status': 'warning', 'message': 'Last name not valid'},
                            status=status.HTTP_406_NOT_ACCEPTABLE)
        user_instance.first_name = user_data['first_name']
        user_instance.last_name = user_data['last_name']
        user.updated_by = user
        user.updated_at = timezone.now()
        user_instance.save(update_fields=['first_name', 'last_name', 'updated_by', 'updated_at'])
        return Response({'status': True, 'message': 'user updated'}, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, url_path='get-user')
    def get_user(self, request):
        user = request.user
        user_details = UserSerializer(user, context={'request': request}).data
        user_details['accesses'] = list()
        user_details['user_type'] = self.get_user_type(user_details['user_type'])
        access_joined = user.groups.all().values_list('details__accesses', flat=True)
        for string in access_joined:
            if string is not None:
                user_details['accesses'] += string.split(',')
        user_details['accesses'] = list(set(user_details['accesses']))
        user_details['accesses'] = sorted(user_details['accesses'])
        return Response({'status': True, 'user': user_details}, status=status.HTTP_200_OK)