import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  showAlert = false;
  model: {username: string, password: string} = { username: '', password: '' };
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  submitForm(form: NgForm) {
    this.model.username = form.controls['username'].value;
    this.model.password = form.controls['password'].value;
    this.authenticateCredentials();
  }

  authenticateCredentials() {
    const isAuthorized = this.authenticationService.authenticateCredentials(this.model);
    if (isAuthorized) {
      this.router.navigateByUrl('wall');
      return;
    }
    this.showAlert = true;
  }
}
