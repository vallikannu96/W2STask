import { Component, OnInit } from '@angular/core';
import { SkillsService } from 'src/app/shared/services/skills/skills.service'
import {ToastService} from "../../../../shared/services/common/toast.service";

@Component({
  selector: 'app-list-skills',
  templateUrl: './list-skills.component.html',
  styleUrls: ['./list-skills.component.scss']
})
export class ListSkillsComponent implements OnInit {
  skills_list = [];
  public settings = {
    columns: {
      name: {
        title: 'Skill name'
      },
      description: {
        title: 'Description'
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
  ) { }

  ngOnInit(): void {
    this.skillsService.listSkills().subscribe(
      response => {
        this.skills_list = response['skills'];
      },
      error => {
        console.log(error);
      }
    )
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
