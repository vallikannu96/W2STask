import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, take, tap } from 'rxjs/operators';
import { Observable, timer } from 'rxjs';
// import { Subscription } from 'rxjs';

// -- Configurations --
import { isTokenExpired, setToken, unsetToken, AUTH_TOKEN } from '../../app-config';

// -- Classes --
import { User } from '../../classes/user';

// -- Services --
import { InterfaceService } from './interface.service';
import { async } from 'q';
import { Router } from '@angular/router';
import { Permissions } from '../../permissions/permissions';
declare var findMyIP: any;

@Injectable()
export class GlobalService extends InterfaceService {

    user: User
    isLoggedIn : boolean;

    public profile_image_source = new BehaviorSubject<any>(null)
    profile_image$: Observable<any> = this.profile_image_source.asObservable()

    public geolocation = new BehaviorSubject<object>({})
    geolocation$: Observable<object> = this.geolocation.asObservable()

    public isLoggedInSource = new BehaviorSubject<boolean>(false)
    isLoggedIn$: Observable<boolean> = this.isLoggedInSource.asObservable()


    private userSource = new BehaviorSubject<User>(new User());
    user$: Observable<User> = this.userSource.asObservable();
    private userPermissionsSource = new BehaviorSubject<Array<string>>([]);
    userPermissions$: Observable<Array<String>> = this.userPermissionsSource.asObservable();

    private get _router() { return this._injector.get(Router); }

    constructor(
        private http: HttpClient,
        private _injector: Injector,
    ) {
        super();
        this.user$.subscribe(user => this.user = user)
        this.isLoggedIn$.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn)
    }

    // Loading project
    loadProject(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {

            if (isTokenExpired()) {
                this.setUser();
                resolve(true);
            } else {
                // Fetches config data and bootstraps app if authenticated
                this.getUserdata().subscribe(
                    response => {
                        setToken(response['token']);
                        this.setUser(response['user']);
                        resolve();
                    },
                    error => {
                        unsetToken();
                        resolve(error)
                    }
                );
            }
        });
    }

    // Get user data & new token
    // changed params for getting ip address
    getUserdata() {
        const credentials = `{"token":"${localStorage.getItem(AUTH_TOKEN)}"}`;
        return this.http
            .post(this.getApiUrl('api-token-refresh/'), credentials, this.getHttpOptions())
            .pipe(
                map(response => response),
                catchError(this.handleError)
            );
    }

    // Set or Change user value
    setUser(details?: Object) {
        if (!(details instanceof Object)) {
            details = {};
        }

        this.userPermissionsSource.next(details['accesses'] || []);
        delete details['permissions'];

        this.userSource.next(new User(details));
    }

}
