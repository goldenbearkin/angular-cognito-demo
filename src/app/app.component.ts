import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// ngrx
import { Store } from '@ngrx/store';
import { AppStateT } from './ngrx';
import * as fromCurrent from './ngrx/auth/current/current.store';

@Component({
  selector: 'msp-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'Moussy Pad';
  currentState$: Observable<fromCurrent.CurrentStateT>;

  constructor(private store: Store<AppStateT>) { }

  ngOnInit() {
    this.store.dispatch(new fromCurrent.CurrentInitAction());
    this.currentState$ = this.store.select(fromCurrent.getCurrentState);
  }
}

