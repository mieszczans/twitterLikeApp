import { AlertModule } from 'ngx-bootstrap/alert';
import { AuthenticateGuard } from './guards/authenticate.guard';
import { AuthenticationService } from './services/authentication.service';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ButtonsModule,
    FormsModule,
    AlertModule.forRoot()
  ],
  declarations: [LoginComponent, NotFoundComponent],
  providers: [AuthenticationService, AuthenticateGuard],
  exports: [LoginComponent]
})
export class CoreModule { }
