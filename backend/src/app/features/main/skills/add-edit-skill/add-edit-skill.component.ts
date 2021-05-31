import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ToastService} from "../../../../shared/services/common/toast.service";
import { AppValidator } from 'src/app/directives/form-validators/app-validators';
import { Router } from '@angular/router';
import { SkillsService } from 'src/app/shared/services/skills/skills.service';

@Component({
  selector: 'app-add-edit-skill',
  templateUrl: './add-edit-skill.component.html',
  styleUrls: ['./add-edit-skill.component.scss']
})
export class AddEditSkillComponent implements OnInit {
  public skillsForm: FormGroup;
  showScreen : boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private skillSerive : SkillsService
    )
  {
    this.createSkillsForm();
  }

  ngOnInit(): void {

  }

  createSkillsForm() {
    this.skillsForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.showScreen = true;
  }

  onSkillsFormSubmit(){
    this.skillSerive.addSkill(this.skillsForm.value).subscribe(
      (response) => {
        this.router.navigate(['skills/list-skills']);
        this.toastService.show('Skill created successfully!', {classname: 'bg-success'});
      }, (error) => {
        this.toastService.show('Internal error. Please try again.', {classname: 'bg-danger'});
      }
    );
  }

}
