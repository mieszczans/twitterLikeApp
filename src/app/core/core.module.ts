import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ButtonsModule,
    FormsModule
  ],
  declarations: [LoginComponent, NotFoundComponent],
  exports: [LoginComponent]
})
export class CoreModule { }
