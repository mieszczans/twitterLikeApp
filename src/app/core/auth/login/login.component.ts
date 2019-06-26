import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  protected model: {userName: string, password: string} = { userName: '', password: '' };
  constructor() { }

  ngOnInit() {
  }

  submitForm(form: NgForm) {
    console.log(form);
  }

}
