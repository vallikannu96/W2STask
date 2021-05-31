import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
    selector     : 'error-404',
    templateUrl  : './error-404.component.html',
    styleUrls    : ['./error-404.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class Error404Component {
    page: string = 'login';
    url: string = '';
    
    constructor(
        private authService: AuthService,
        private router: Router
    )
    {
        authService.authenticated() ? this.page = 'dashboard' : this.page = 'login';
        authService.authenticated() ? this.url = '/dashboard/default' : this.page = '/login';
    }
}
