import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditSkillComponent } from './add-edit-skill/add-edit-skill.component';
import { ListSkillsComponent } from './list-skills/list-skills.component';
import { AuthGuardService } from '../../../shared/services/auth/auth-guard.service';
import { AddEmployeeSkillComponent } from '../skills/add-employee-skill/add-employee-skill.component';
import { ListEmployeeSkillComponent } from '../skills/list-employee-skill/list-employee-skill.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-skills',
        component: ListSkillsComponent,
        canActivate: [AuthGuardService],
        data: {
          title: "Skills List",
          breadcrumb: "User List",
          roles: ['view#skill']
        }
      },
      {
        path: 'create-skill',
        component: AddEditSkillComponent,
        canActivate: [AuthGuardService],
        data: {
          title: "Create Skill",
          breadcrumb: "Create User",
          roles: ['add#skill']
        }
      },
      {
        path: 'list-employee-skills',
        component: ListEmployeeSkillComponent,
        canActivate: [AuthGuardService],
        data: {
          title: "Employee skills list",
          breadcrumb: "Employee skills list",
          roles: ['view#employeeskill']
        }
      },
      {
        path: 'create-employee-skill',
        component: AddEmployeeSkillComponent,
        canActivate: [AuthGuardService],
        data: {
          title: "Create Employee Skill",
          breadcrumb: "Create Employee Skill",
          roles: ['add#employeeskill']
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillsRoutingModule { }
