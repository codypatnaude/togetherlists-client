import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwt: JwtHelperService) { }

  getToken() {
    return tokenGetter();
  }

  setToken(token) {
    console.log(`setting token ${token}`);
    return localStorage.setItem('token', token);
  }

  isAuthenticated() {
    return !this.jwt.isTokenExpired();
  }
}

export function tokenGetter() {
  return localStorage.getItem('token');
}
