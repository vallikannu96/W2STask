import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// project imports
// modules
import { SharedModule } from 'src/app/shared/shared.module';

//services
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';

// components
import { LoginComponent } from './login/login.component';
import { DirectivesModule } from 'src/app/directives/directives.module';

const AUTH_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'verify-email', component: ForgotPasswordComponent },
  // { path: 'set-password', component: ForgotPasswordComponent },
  // { path: 'new-password', component: ForgotPasswordComponent },
  // { path: 'reset-password', component: ForgotPasswordComponent },
  // { path: 'set-new-password', component: ForgotPasswordComponent },
];

@NgModule({
  declarations: [
      LoginComponent,
  ],
  imports: [
      // angular modules
      CommonModule,
      RouterModule.forChild(AUTH_ROUTES),
      ReactiveFormsModule,
      NgbModule,
      CarouselModule,
      // project modules
      SharedModule,
      DirectivesModule
  ],
  entryComponents: [

  ],
  providers: [
  ]
})
export class AuthModule { }
