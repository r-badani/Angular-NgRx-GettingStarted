import { State } from '../state/app.state';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import * as UserActions from './state/user.actions';
import { isUserNameMasked } from './state/user.reducer';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';

  maskUserName: boolean;

  constructor(
    private store: Store<State>,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.select(isUserNameMasked).subscribe((maskUserName) => {
      this.maskUserName = maskUserName;
    });
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(): void {
    this.store.dispatch(UserActions.toggleUserNameMask());
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    }
  }
}
