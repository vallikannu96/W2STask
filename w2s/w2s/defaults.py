from django.contrib.auth.models import Permission


class TaskDefaults(object):
    access_specifiers = None

    @classmethod
    def get_predefined_roles(cls):
        """
        Returns predefined role alias and its names
        """
        return {
            'Superuser': 'Predefined/Superuser',
            'Manager': 'Predefined/Manager',
            'Employee': 'Predefined/Employee',
        }

    @classmethod
    def __init__(cls):

        if cls.access_specifiers is None:
            cls.access_specifiers = {
                # Users
                "add#users": [
                    cls.get_permissions(app_label='users',
                                        model_name='taskusers',
                                        codename_list=['add_taskusers']
                                        ),
                ],
                "view#users": [
                    cls.get_permissions(app_label='users',
                                        model_name='taskusers',
                                        codename_list=['view_taskusers']
                                        )
                ],
                "edit#users": [
                    cls.get_permissions(app_label='users', model_name='taskusers',
                                        codename_list=['change_taskusers'])
                ],
                "delete#users": [
                    cls.get_permissions(app_label='users', model_name='taskusers',
                                        codename_list=['delete_taskusers'])
                ],

                # Roles
                "add#roles": [
                    cls.get_permissions(app_label='auth', model_name='group',
                                        codename_list=['add_group']
                                        ),
                    cls.get_permissions(app_label='users', model_name='roles',
                                        codename_list=['add_roles']
                                        )
                ],
                "view#roles": [
                    cls.get_permissions(app_label='auth', model_name='group',
                                        codename_list=['view_group']
                                        ),
                    cls.get_permissions(app_label='users', model_name='roles',
                                        codename_list=['view_roles']
                                        )
                ],
                "edit#roles": [
                    cls.get_permissions(app_label='auth', model_name='group',
                                        codename_list=['change_group']),
                    cls.get_permissions(app_label='users', model_name='roles',
                                        codename_list=['change_roles'])
                ],
                "delete#roles": [
                    cls.get_permissions(app_label='auth', model_name='group',
                                        codename_list=['delete_group']),
                    cls.get_permissions(app_label='users', model_name='roles',
                                        codename_list=['delete_roles'])
                ],

                #skills
                "add#skill": [
                    cls.get_permissions(app_label='skills',
                                        model_name='skills',
                                        codename_list=['add_skills']
                                        ),
                ],
                "view#skill": [
                    cls.get_permissions(app_label='skills',
                                        model_name='skills',
                                        codename_list=['view_skills']
                                        )
                ],
                "edit#skill": [
                    cls.get_permissions(app_label='skills', model_name='skills',
                                        codename_list=['change_skills'])
                ],
                "delete#skill": [
                    cls.get_permissions(app_label='skills', model_name='skills',
                                        codename_list=['delete_skills'])
                ],

                # skills
                "add#employeeskill": [
                    cls.get_permissions(app_label='skills',
                                        model_name='employeeskills',
                                        codename_list=['add_employeeskills']
                                        ),
                ],
                "view#employeeskill": [
                    cls.get_permissions(app_label='skills',
                                        model_name='employeeskills',
                                        codename_list=['view_employeeskills']
                                        )
                ],
                "edit#employeeskill": [
                    cls.get_permissions(app_label='skills', model_name='employeeskills',
                                        codename_list=['change_employeeskills'])
                ],
                "delete#employeeskill": [
                    cls.get_permissions(app_label='skills', model_name='employeeskills',
                                        codename_list=['delete_employeeskills'])
                ],

            }


    @classmethod
    def get_permissions(cls, app_label, model_name, codename_list):
        """
        Returns list of permission ids for provided code names
        For Eg, code name = 'add_consultigeruser'
        """
        permissions = Permission.objects.filter(
            content_type__app_label = app_label,
            content_type__model = model_name,
            codename__in = codename_list
        ).values_list('id', flat=True)

        return list(permissions)

    @classmethod
    def get_predefined_role_access_specifiers(cls, role_alias):
        """
        Returns list of access specifiers for the requesting role alias
        """
        cls.__init__()

        specifiers_of_predefined_roles = {
            'Superuser': list(cls.access_specifiers.keys()),
            'Manager': [
                "add#users",
                "edit#user",
                "view#user",
                "delete#users",
                "add#skill",
                "view#skill",
                "edit#skill",
                "delete#skill",
            ],
            'Employee': [
                "add#skill",
                "view#skill",
                "edit#skill",
                "delete#skill",
                "add#employeeskill",
                "view#employeeskill",
                "edit#employeeskill",
                "delete#employeeskill"
            ]
        }
        return specifiers_of_predefined_roles[role_alias]

    @classmethod
    def get_all_permissions(cls, app_label, model):
        """
        Returns list of permission ids corresponding to the model
        """
        permissions = Permission.objects.filter(
            content_type__app_label=app_label,
            content_type__model=model
        ).values_list('id', flat=True)

        return list(permissions)

    @classmethod
    def get_access_specifier_permissions(cls, access):
        """ Returns list of permission ids for the requested access specifier """
        cls.__init__()
        specifier_permissions = []
        if access in cls.access_specifiers.keys():
            specifier_permissions = list(set([item for sublist in cls.access_specifiers[access] for item in sublist]))

        return specifier_permissions, 'permissions'

