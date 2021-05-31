import { Component, OnInit } from '@angular/core';
import { SkillsService } from 'src/app/shared/services/skills/skills.service'
import {ToastService} from "../../../../shared/services/common/toast.service";

@Component({
  selector: 'app-list-employee-skill',
  templateUrl: './list-employee-skill.component.html',
  styleUrls: ['./list-employee-skill.component.scss']
})
export class ListEmployeeSkillComponent implements OnInit {

  employee_skills_list = [];
  public settings = {
    columns: {
      skill__name: {
        title: 'Skill name'
      },
      percentage: {
        title: 'Percentage'
      }
    },
    actions: {
      add: false,
      edit: false,
      position: 'right'
    },
    hideSubHeader: true,
    delete: {
      confirmDelete: true,
    },
    mode: 'inline',
  };

  constructor(
    private skillsService: SkillsService,
    private toastService: ToastService
  ) {
    this.skillsService.listEmployeeSkills().subscribe(
      response => {
        this.employee_skills_list = response['skills'];
      },
      error => {
        console.log(error);
      }
    )
  }

  ngOnInit(): void {

  }

  confirmDelete(event){
    let isDelete: any;
    isDelete = confirm('Are you sure want to delete?');
    if(isDelete){
      let id = event.data.id;
      this.skillsService.deleteSkill(id).subscribe( response => {
        this.toastService.show('Skill deleted successfully!', {classname: 'bg-success'});
        event.confirm.resolve(isDelete);
      },
      error => {
        this.toastService.show('Internal error. Please try again.', {classname: 'bg-danger'});
      });
    }else{
      console.log('not deleted');
    }
  }


}
