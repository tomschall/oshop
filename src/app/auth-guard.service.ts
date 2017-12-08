import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  /* with .map we are mapping an observable of firebase.User to an Observable of boolean
     so we have to return here with "return this.auth.user$.map(user => {.....});"
     This Auth Guard has to be applied in App Module */

  canActivate(route, state: RouterStateSnapshot) {
    return this.auth.user$.map(user => {
      if (user) return true;

      /* We need state: RouterStateSnapshot to set the queryParams to redirect 
         to specific page that the user wanted to surf to */
         
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    });
  }

}
