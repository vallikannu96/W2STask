// angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// project modules
// modules
import { SharedModule } from '../shared/shared.module';

//services
import { AuthGuardService, AuthRedirectorService, PermissionService } from '../shared/services/auth/auth-guard.service';
import { AuthModule } from './auth/auth.module';
// import { CanDeactivateGuard } from '../shared/services/auth/can-deactivate.guard';

// components
import { Error404Component } from './errors/404/error-404.component';
import { Error500Component } from './errors/500/error-500.component';
import { ContentLayoutComponent } from '../shared/layout/content-layout/content-layout.component';
import { content } from 'src/app/shared/routes/content-routes';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthRedirectorService],
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '',
        component: ContentLayoutComponent,
        children: content
    },
    { path: 'not-found', component: Error404Component },
    { path: 'server-error', component: Error500Component },
    { path: '**', redirectTo: '/not-found' },
];

@NgModule({
    declarations: [
        Error404Component,
        Error500Component,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        AuthModule,
    ],
    exports: [
        RouterModule,
        AuthModule,
    ],
    entryComponents: [

    ]
})
export class FeaturesModule { }
