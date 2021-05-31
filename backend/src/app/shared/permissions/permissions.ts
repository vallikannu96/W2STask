import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { GlobalService } from '../services/auth/global.service';
import { User } from '../classes/user';


@Injectable({
    providedIn: 'root'
})
export class Permissions {
    user: User
    constructor(private router: Router,
        private globalService: GlobalService,
        ) {
        this.globalService.user$.subscribe(user => {
            this.user = user;
        })
    }

    setNavigationMenusAccesses(navigation, userData): any {
        var navigations: any = navigation;
        if (userData['accesses']) {
            let access = userData['accesses'];
            navigations.map(function (nav) {
                if (nav.id.includes('dashboard')) {
                    if (access.includes('view#users')) {
                        nav['hidden'] = false;
                    }
                    else {
                        nav['hidden'] = true;
                    }
                }

                if (nav.id.includes('users')) {
                    if (access.includes('view#users') || access.includes('add#users')) {
                        nav['hidden'] = false
                    }
                    else {
                        nav['hidden'] = true
                    }
                }

                if (nav.id.includes('skills')) {
                    if (access.includes('view#skill') || access.includes('add#skill') ) {
                        nav['hidden'] = false
                    }
                    else {
                        nav['hidden'] = true
                    }
                }
            })
        }
        return navigations
    }
}