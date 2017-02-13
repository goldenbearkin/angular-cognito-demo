import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppStateT } from '../../../../../ngrx';
import { CurrentResetRequestAction } from '../../../../../ngrx/auth/current/current.store';

@Component({
  selector: 'msp-auth-logout-button',
  templateUrl: './auth-logout-button.component.html',
  styleUrls: ['./auth-logout-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthLogoutButtonComponent {

  constructor(private store: Store<AppStateT>) { }

  logout() {
    this.store.dispatch(new CurrentResetRequestAction());
  }
}
