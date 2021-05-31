import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUserComponent } from './list-user/list-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { AuthGuardService } from 'src/app/shared/services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-user',
        component: ListUserComponent,
        canActivate: [AuthGuardService],
        data: {
          title: "User List",
          breadcrumb: "User List",
          roles: ['view#users']
        }
      },
      {
        path: 'create-user',
        component: CreateUserComponent,
        canActivate: [AuthGuardService],
        data: {
          title: "Create User",
          breadcrumb: "Create User",
          roles: ['add#user']
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
