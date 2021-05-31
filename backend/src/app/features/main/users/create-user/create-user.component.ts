import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/users/user.service';
import { AppValidator } from 'src/app/directives/form-validators/app-validators';
import { Router } from '@angular/router';
import {ToastService} from "../../../../shared/services/common/toast.service";


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  public accountForm: FormGroup;
  countryCodes: any = [];
  userTypes: any = [
    {
      id: 'M',
      value: 'Manager'
    },
    {
      id: 'E',
      value: 'Employee'
    },
  ];
  showEmailErrorMessage: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private toastService: ToastService,
              private userService : UserService,
              private router: Router,) {
    this.createAccountForm();
  }

  createAccountForm() {

    this.accountForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, AppValidator.emailValidator]],
      password: ['', [Validators.required, AppValidator.passwordValidator]],
      user_type: ['', Validators.required],
    });

    this.accountForm.get('email').valueChanges.subscribe( val =>{
      let data = { email : val };
      this.userService.checkEmailExists(data).subscribe((res) =>{
        this.showEmailErrorMessage = false;
        console.log(res);
        if(res['status'] == 'warning'){
          this.showEmailErrorMessage = true;
        }else{
          this.showEmailErrorMessage = false;
        }
      });
    });
  }

  ngOnInit() {

  }

  onAccountFormSubmit(){
    this.userService.createNewUser(this.accountForm.value).subscribe(
      (response) => {
        this.router.navigate(['users/list-user']);
        this.toastService.show('User created successfully!', {classname: 'bg-success'});
      }, (error) => {
        this.toastService.show('Internal error. Please try again.', {classname: 'bg-danger'});
      }
    );
  }

}
