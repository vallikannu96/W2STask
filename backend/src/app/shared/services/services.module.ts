import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuardService, AuthRedirectorService, PermissionService } from './auth/auth-guard.service';
import { GlobalService } from '../services/auth/global.service';
import { InterfaceService } from '../services/auth/interface.service';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/users/user.service';
import { ContentService } from '../services/common/content.service';
import { ToastService } from '../services/common/toast.service';
import { SkillsService } from '../services/skills/skills.service';


export function globalServiceFactory(global: GlobalService) {
  return () => global.loadProject();
}

export const appInitializer = {
  provide: APP_INITIALIZER,
  useFactory: globalServiceFactory,
  deps: [GlobalService],
  multi: true
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers : [
    // app services
    appInitializer,
    GlobalService,
    InterfaceService,

    // guards
    AuthGuardService,
    AuthRedirectorService,
    PermissionService,

    // services
    AuthService,
    UserService,
    ContentService,
    ToastService,
    SkillsService
  ]
})
export class ServicesModule { }
