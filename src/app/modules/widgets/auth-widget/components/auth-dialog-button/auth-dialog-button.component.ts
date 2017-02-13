import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MdDialog } from '@angular/material';

import { AuthWidgetComponent } from '../../auth-widget.component';

import { Store } from '@ngrx/store';
import { AppStateT } from '../../../../../ngrx';
import * as fromCurrent from '../../../../../ngrx/auth/current/current.store';

import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'msp-auth-dialog-button',
  templateUrl: './auth-dialog-button.component.html',
  styleUrls: ['./auth-dialog-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthDialogButtonComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject<true>();

  constructor(private dialog: MdDialog, private store: Store<AppStateT>) { }

  ngOnInit() {
    this.store.select(fromCurrent.getCurrentState)
      .takeUntil(this.onDestroy$)
      .filter<fromCurrent.OnSuccessT>(state => state.current === 'onSuccess')
      .subscribe(state => this.dialog.closeAll());
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
  }

  openDialog() {
    this.dialog.open(AuthWidgetComponent, {
      role: 'dialog',
      disableClose: false,
      height: '550px',
      width: '400px'
    });
  }
}
