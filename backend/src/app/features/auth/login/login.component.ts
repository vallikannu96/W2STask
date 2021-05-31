import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../app/shared/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppValidator } from 'src/app/directives/form-validators/app-validators';
import { ContentService } from 'src/app/shared/services/common/content.service';
import { UserService  } from 'src/app/shared/services/users/user.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public registerForm: FormGroup;
  errorMessage: string = '';
  owlcarousel = [];
  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true,
    slideTransition: 'linear',
    autoplay: true,
    autoplayTimeout: 5000,
  };
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private contentService: ContentService,
    private router: Router,
    private userServie : UserService) {
    if(this.authService.authenticated()){
      this.userServie.getUserData().subscribe(
        response => {
          if(response['user']['user_type'] == 'Employee'){
            this.router.navigate(['/skills/create-skill']);
          }else{
            this.router.navigate(['/dashboard/default']);
          }

        },
        error => {
          console.log(error);
        }
      )
    }
    this.createLoginForm();
    this.createRegisterForm();
    this.owlcarousel = this.contentService.getLoginOwlcarouselData();
  }


  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, AppValidator.emailValidator]],
      password: ['', Validators.required],
    })
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      userName: [''],
      password: [''],
      confirmPassword: [''],
    })
  }


  ngOnInit() {
  }

  login() {
    console.log(this.loginForm.value)

    let credentials = {
      "username" : this.loginForm.value['email'],
      "email" : this.loginForm.value['email'],
      "password" : this.loginForm.value['password']
    }

    this.authService.login(credentials).subscribe(
      response => {
        console.log(response);
        this.errorMessage =  '';
        if(response['user']['user_type'] == 'Employee'){
          this.router.navigate(['/skills/create-skill']);
        }else{
          this.router.navigate(['/dashboard/default']);
        }
      },
      error => {
        console.log(error);
        if(error.non_field_errors && error.non_field_errors.length){
            this.errorMessage = error.non_field_errors[0];
        }
      }
    )

  }

  forgotPassword(){
    this.router.navigate(['/verify-email']);
  }

}
