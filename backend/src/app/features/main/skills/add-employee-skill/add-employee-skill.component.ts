import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from "../../../../shared/services/common/toast.service";
import { AppValidator } from 'src/app/directives/form-validators/app-validators';
import { Router } from '@angular/router';
import { SkillsService } from 'src/app/shared/services/skills/skills.service';

@Component({
  selector: 'app-add-employee-skill',
  templateUrl: './add-employee-skill.component.html',
  styleUrls: ['./add-employee-skill.component.scss']
})
export class AddEmployeeSkillComponent implements OnInit {
  public employeeSkillForm: FormGroup;
  showScreen : boolean = false;
  skills_list = []
  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private skillSerive : SkillsService
  ) {
    this.skillSerive.listSkills().subscribe(
      response => {
        this.skills_list = response['skills'];
        this.createForm()
      },
      error => {
        console.log(error);
      }
    )
   }

  ngOnInit(): void {

  }

  createForm(){
    this.employeeSkillForm = this.formBuilder.group({
      skill: ['', Validators.required],
      percentage: ['', [Validators.required, AppValidator.percentageValidator]]
    });
    this.showScreen = true;
  }

  onemployeeSkillFormSubmit(){
    this.skillSerive.addEmployeeSkill(this.employeeSkillForm.value).subscribe(
      (response) => {
        this.router.navigate(['skills/list-employee-skills']);
        this.toastService.show('Employee Skill created successfully!', {classname: 'bg-success'});
      }, (error) => {
        this.toastService.show('Internal error. Please try again.', {classname: 'bg-danger'});
      }
    );
  }

}
