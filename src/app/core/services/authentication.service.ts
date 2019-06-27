import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
  protected credentials = {
    username: 'Programmer',
    password: 'H1reMe:)'
  };
  constructor(private router: Router) { }

  authenticateCredentials(inputCredentials): boolean {
    if (inputCredentials.password === this.credentials.password
      && inputCredentials.username === this.credentials.username) {
        sessionStorage.clear();
        this.saveInSessionStorage();
      return true;
    }
    return false;
  }

  saveInSessionStorage() {
    sessionStorage.setItem('password', this.credentials.password);
    sessionStorage.setItem('usename', this.credentials.username);
  }

  isLoggedIn(): boolean {
    const credentials = this.getCredentials();
    const verification: boolean = this.authenticateCredentials(credentials);
    return verification;
  }

  getCredentials() {
    const password = sessionStorage.getItem('password');
    const username = sessionStorage.getItem('usename');
    return ({password, username});
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigateByUrl('login');
  }
}
