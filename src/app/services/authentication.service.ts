import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Router, CanActivate } from '@angular/router';
import { map, isEmpty } from 'rxjs/operators';


export interface UserDetails {
  _id: string;
  username: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  username: string;
  password: string;
}

export interface UserInfo{
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token: string;

  constructor(private http: Http, private router: Router) {}

  private authApi= 'http://localhost:3000/auth';

  public login(userInfo: UserInfo) {
    let URI = `${this.authApi}/login/`;
    let headers = new Headers;
    let body = JSON.stringify({username: userInfo.username, password: userInfo.password});
    headers.append('Content-Type', 'application/json');
    return this.http.post(URI, body ,{headers: headers})
    .pipe(map(res => res.json()))
  }

  public getAllUsers() {
    let URI = `${this.authApi}`;
    return this.http.get(URI)
    .pipe(map(res => res.json()))
  }

  public saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (Boolean(token)) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
}
