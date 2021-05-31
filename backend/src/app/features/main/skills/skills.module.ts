import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditSkillComponent } from './add-edit-skill/add-edit-skill.component';
import { ListSkillsComponent } from './list-skills/list-skills.component';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SkillsRoutingModule } from './skills-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { AddEmployeeSkillComponent } from './add-employee-skill/add-employee-skill.component';
import { ListEmployeeSkillComponent } from './list-employee-skill/list-employee-skill.component';



@NgModule({
  declarations: [AddEditSkillComponent, ListSkillsComponent, AddEmployeeSkillComponent, ListEmployeeSkillComponent],
  imports: [
    CommonModule,
    NgbModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    SkillsRoutingModule,
    DirectivesModule
  ]
})
export class SkillsModule { }
