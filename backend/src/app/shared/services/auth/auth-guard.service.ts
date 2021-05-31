import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

// -- Services --
import { AuthService } from './auth.service';
import { GlobalService } from './global.service';
import { Permissions } from '../../permissions/permissions';
import { User } from '../../classes/user';

@Injectable()
export class AuthGuardService implements CanActivate {
    user: any
    constructor(private router: Router, private authService: AuthService,
        private route: ActivatedRoute,
        private globalService: GlobalService,
        private permissions: Permissions,
    ) {
        this.globalService.user$.subscribe(user => { this.user = user });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        // Validating url params
        if (Object.keys(route.data).indexOf('regex') >= 0) {
            const params = route.params;
            for (const param of Object.keys(params)) {
                if (Object.keys(route.data['regex']).indexOf(param) >= 0) {
                    const regex_str = `^${route.data['regex'][param]}$`;
                    const exp = new RegExp(regex_str, 'g');

                    if (!exp.test(params[param])) {
                        this.router.navigate(['/not-found']);
                        return false;
                    }
                }
            }
        }

        // Checks is user authenticated
        if (!this.authService.authenticated()) {
            this.router.navigate(['/login']);
            return false;
        }else{
            // this.router.navigate(['/dashboard/default']);
            return true;
        }

        // Checks permission if roles provided
        // if (!route.data.hasOwnProperty('roles')){

        //     if(!route.data.hasOwnProperty('user_type')){
        //         return true;
        //     }else{
        //         let user_data;
        //         this.globalService.user$.subscribe((data: any) => {
        //             user_data = data;
        //         });
        //         if(user_data['user_type'] == route.data['user_type'] ) return true;
        //         else{
        //             if(user_data['is_superuser'] && route.data['user_type'] == '1') return true;
        //             this.router.navigate(['/error/permission-denied']);
        //             return false;
        //         }
        //     }
        // }
        // else {
        //     if (this.authService.permitted(route.data['roles'])) return true;
        //     else {
        //         this.router.navigate(['/error/permission-denied']);
        //         return false;
        //     }
        // }

    }
}

// Authenticated redirecting services, it helps to redirect directly to homepage if the user is authenticated already
@Injectable()
export class AuthRedirectorService implements CanActivate {
    user: User
    constructor(private router: Router, private authService: AuthService,
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if(state.url.includes('/set-password?token=') || state.url.includes('/forgot-password?token=')
        || state.url.includes('/reset-password?token=') || state.url.includes('/new-password?token=')) {
            this.authService.logout();
            return true
        }

        // Redirecting Authenticated user

        if (this.authService.authenticated()) {
            this.authService.redirectToHome();
            return false;

        } else {
            this.router.navigate(['/login']);
            return true;
        }
    }

}

@Injectable()
export class PermissionService implements CanActivate {
    accesses: any
    constructor(private globalService: GlobalService,
        private permissions: Permissions,
        private router: Router,
        private authService: AuthService) {
        this.globalService.userPermissions$.subscribe(data => {
            this.accesses = data
        })
    }

    canActivate(route: ActivatedRouteSnapshot) {
        // this.router['routerState'].snapshot.url

        if (!this.authService.authenticated()) {
            this.router.navigate(['/login']);
            return false;
        }

        var url = route['_routerState'].url
        var nav = [
            {
                "url": url
            }
        ]
        // console.log(nav)
        var access = this.permissions.setNavigationMenusAccesses(nav, this.accesses)
        if (access[0].hidden) {
            this.router.navigate(['/permission-denied'])
            return false;
        }
        return true;
    }
}


