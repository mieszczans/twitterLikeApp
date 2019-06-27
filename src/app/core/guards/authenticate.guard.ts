import { AuthenticationService } from './../services/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticateGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const canGetIn = this.authenticationService.isLoggedIn();
      if (canGetIn) {
        return true;
      } else {
        this.router.navigateByUrl('login');
        return false;
      }
  }
}
