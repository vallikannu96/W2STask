from django.apps import AppConfig
from django.db.models.signals import post_migrate

def add_view_permissions(sender, **kwargs):
    """
           This takes care of adding a view permission too all our
           content types on migration.
    """
    from django.contrib.auth.models import Permission
    from django.contrib.contenttypes.models import ContentType
    def check_and_add_permission(permission, content_type):
        # Generate permission codename
        codename = "%s_%s" % (permission, content_type.model)

        #check for permission
        if not Permission.objects.filter(codename = codename):
            # Add permission
            permission = Permission.objects.create(
                content_type = content_type,
                codename = codename,
                name = 'Can %s %s ' % (permission, content_type.name)
            )
            print('Added %s permission for %s' % (permission, content_type.model))

    for content_type in ContentType.objects.all():
        check_and_add_permission('view', content_type)


def create_predefined_roles(sender, **kwargs):
    """
        This takes care of defining and creating set of predefined roles like partner_role
    """
    from django.contrib.contenttypes.models import ContentType
    from w2s.defaults import TaskDefaults
    from users.models import Roles

    if ContentType.objects.filter(app_label='auth', model='group').exists() and ContentType.objects.filter(app_label='users', model='roles').exists():
        predefined_roles = TaskDefaults.get_predefined_roles()
        for role_alias, role_name in predefined_roles.items():
            group_model = ContentType.objects.filter(app_label='auth', model='group')[0].model_class()

            if not group_model.objects.filter(name=role_name).exists():
                access_specifiers = TaskDefaults.get_predefined_role_access_specifiers(role_alias=role_alias)
                allowed_permissions_sets = [
                    TaskDefaults.get_access_specifier_permissions(specifier)[0] for specifier in access_specifiers]
                allowed_permissions = list(set([item for sublist in allowed_permissions_sets for item in sublist]))

                # Creating Group
                group_instance = group_model.objects.create(name=role_name)
                group_instance.permissions.set(allowed_permissions)
                if group_instance.save() is None:
                    print('\033[0;37;42m Generated new role "%s", Applying details... \033[0m' % role_alias)

                # Creating Role detail
                role_instance = Roles.objects.create(
                    group = group_instance,
                    alias = role_alias,
                    accesses = ','.join(access_specifiers),
                    description = 'Predefined role for %s' % role_alias
                )

                if role_instance.save() is None:
                    print('\033[0;37;42m Details applied for role: %s \033[0m' % role_alias)
    else:
        print('---- Error while generating predefined roles ---')
        print(' -Either auth.group or users.roles model does not exists !!!')


class CommonConfig(AppConfig):
    name = 'common'

    def ready(self):
        post_migrate.connect(add_view_permissions)
        post_migrate.connect(create_predefined_roles)
        # connecting signals with receivers