import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    // here are 2 observables, so we need switchMap that we get AuthUser back
    return this.auth.appUser$
      .map(appUser => appUser.isAdmin);
    }

}
