import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/throttleTime';
// import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class UserInteractionService {
  isInputting$(stream$: Observable<any>): Observable<boolean> {
    return Observable.merge(
      stream$
        .throttleTime(600)
        .map( _ => true ),
      stream$
        .debounceTime(600)
        .map( _ => false )
    ).distinctUntilChanged();
  }
}
