import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(private http: HttpClient) { 
    this.userSubject = new BehaviorSubject<any>(null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): any {
    return this.userSubject.value;
  }

  login(model: any) {
    return this.http.post(`${this.baseUrl}login`, model)
    .pipe(map(user => {
      this.userSubject.next(user);
      this.startRefreshTokenTimer();
      return user;
    }));
  }

  register(model: any) {
    return this.http.post(`${this.baseUrl}register`, model);
  }

  refreshToken() {
    return this.http.post<any>(`${this.baseUrl}login`, {})
        .pipe(map((user) => {
            this.userSubject.next(user);
            this.startRefreshTokenTimer();
            return user;
        }));
  }

  private refreshTokenTimeout: any;

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    // const jwtToken = JSON.parse(atob(this.userValue.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const today = new Date();
    const expires = today.setMinutes( today.getMinutes() + 10 );
    const expiryTime = new Date(expires).toString();
    localStorage.setItem('tokenExpiration', expiryTime);
    const timeout = expires - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
      clearTimeout(this.refreshTokenTimeout);
  }
}
