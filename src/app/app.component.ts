import { UserService } from './shared/services/user.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  private user: Subscription;

  constructor(private userService: UserService, private auth: AuthService, router: Router) {
    this.user = auth.user$.subscribe(user => {
      if (!user) return;
      userService.save(user);
      
      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;
      
      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });
  }
  
  ngOnDestroy() {
    this.user.unsubscribe();
  }
  
}
