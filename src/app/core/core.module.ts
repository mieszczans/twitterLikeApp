import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonsModule
  ],
  declarations: [LoginComponent, NotFoundComponent],
  exports: [LoginComponent]
})
export class CoreModule { }
