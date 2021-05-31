import { Inject, Injectable, forwardRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { timer, BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap, first, map } from 'rxjs/operators';

// -- Configurations --
import { isTokenExpired, getToken, unsetToken, setToken, getTokenExpiration, GetApiurl } from '../../app-config';

// -- Services --
import { GlobalService } from './global.service';
import { InterfaceService } from './interface.service';

// -- Classes --
import { User } from '../../classes/user';
import { Permissions } from '../../permissions/permissions';

@Injectable()
export class AuthService extends InterfaceService {

    user: User;
    userPermissions: Array<string> = [];

    constructor(
        private http: HttpClient,
        private router: Router,
        private permissions: Permissions,
        @Inject(forwardRef(() => GlobalService)) private globals,
    ) {
        super();
        this.subscriptions['user'] = this.globals.user$.subscribe(u => this.user = u);
        this.subscriptions['userPermissions'] = this.globals.userPermissions$.subscribe(ps => this.userPermissions = ps);
    }

    // Checks is authenticated
    public authenticated() {
        // Check if there's an unexpired JWT
        return !isTokenExpired();
    }

    // Checks is user has roles
    public permitted(roles: Array<string>, userTypes?: Array<string>) {
        // Checking for user type permission
        if (userTypes && (!(userTypes instanceof Array) || (userTypes.indexOf(this.user.user_type) < 0))) {
            return false;
        }

        if (!(this.user instanceof Object) || !(this.userPermissions instanceof Array)) {
            return false;
        } else {
            if (intersect(this.userPermissions, roles).length != 0) {
                return true;
            } else {
                return false;
            }
        }


        function intersect(a, b) {
            let t;
            if (b.length > a.length) {
                t = b, b = a, a = t; // indexOf to loop over shorter
            }
            return a.filter(e => b.indexOf(e) > -1).filter((e, i, c) => c.indexOf(e) === i); // extra step to remove duplicates
        }
    }

    // Login action
    public login(credentials: any) {
        return this.http.post(this.getApiUrl('api-token-auth/'), credentials, this.getHttpOptions('json', false))
            .pipe(
                tap(response => this.handleAuthResponse(response)),
                catchError(this.handleError)
            );
    }

    // Handle response and schedule token auto refresh
    public handleAuthResponse(response: any): void {

        if ('token' in response) {
            setToken(response['token']);
            this.globals.setUser(response['user']);

            const now = new Date().valueOf();
            const exp = <Date>getTokenExpiration();
            const delay = exp.valueOf() - now;
            const _timer = timer(delay - 60);

            _timer.subscribe(() => {
                this.refreshToken().subscribe();
            });
        }
    }

    // Refreshing token
    public refreshToken() {
        console.log('Token expired refreshing : ', new Date());
        return this.http.get(this.getApiUrl('api-token-refresh/'), this.getHttpOptions('json', false))
            .pipe(
                tap(response => this.handleAuthResponse(response[0])),
                catchError(error => {
                    error = this.handleError(error);
                    this.router.navigate(['/login']);
                    return error;
                })
            );
    }

    // Redirecting to respective homepages for the recpective user types
    redirectToHome() {
        this.router.navigate(['/dashboard/default']);
    }

    // Logout action
    // Logout action
    public logout() {
        if (getToken()) {
            unsetToken();
            this.globals.setUser();
        }
        localStorage.clear();
        this.router.navigate(['/']);
    }
}

