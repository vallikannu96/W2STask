import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppValidator } from './form-validators/app-validators';
import { ControlMessagesComponent } from './form-validators/control-messages.component';


@NgModule({
  declarations: [
    ControlMessagesComponent,  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ControlMessagesComponent,
  ],
  providers : [
    AppValidator,
  ]
})
export class DirectivesModule { }
