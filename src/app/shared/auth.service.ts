import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthentificated$ = new BehaviorSubject(true);
  readonly isAuthentificated$ = this._isAuthentificated$.asObservable();
  get isAuthenticated() {
    return this._isAuthentificated$.value;
  }
  login() {
    this._isAuthentificated$.next(true);
  }

  logout() {
    this._isAuthentificated$.next(false);
  }
  //constructor() {}
}
