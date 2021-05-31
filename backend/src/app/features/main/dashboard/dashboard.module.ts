import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { CountToModule } from 'angular-count-to';
import { ChartsModule } from 'ng2-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartistModule } from 'ng-chartist';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthGuardService } from 'src/app/shared/services/auth/auth-guard.service';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'default',
        canActivate: [AuthGuardService],
        component: DashboardComponent,
        data: {
          title: "Dashboard",
          breadcrumb: "Dashboard",
          roles: ['add#users']
        }
      }
    ]
  }
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    CountToModule,
    SharedModule,
    ChartsModule,
    Ng2GoogleChartsModule,
    NgxChartsModule,
    ChartistModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class DashboardModule { }
