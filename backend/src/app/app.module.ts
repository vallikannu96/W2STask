import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from  '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { AuthRedirectorService } from '../app/shared/services/auth/auth-guard.service';
import { DirectivesModule } from '../app/directives/directives.module';
import { FeaturesModule } from '../app/features/features.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    RouterModule.forRoot([], {anchorScrolling: 'enabled'}),
    FeaturesModule,
    DirectivesModule,
  ],
  providers: [ AuthRedirectorService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
