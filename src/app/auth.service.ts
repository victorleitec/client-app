import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {User} from "./login/user";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";
import {userError} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.apiURLBase + "/api/users"
  tokenURL: string = environment.apiURLBase + environment.getTokenUrl
  clientID: string = environment.clientId
  clientSecret: string = environment.clientSecret
  jwtHelper: JwtHelperService = new JwtHelperService()

  constructor(
    private http: HttpClient
  ) {
  }

  getToken() {
    const tokenString = localStorage.getItem('access_token')
    if (tokenString) {
      return JSON.parse(tokenString).access_token
    }
    return null;
  }

  finishSession() {
    localStorage.removeItem('access_token')
  }

  getUserAuthenticated() {
    const token = this.getToken()
    if (token) {
     const user = this.jwtHelper.decodeToken(token).user_name
      return user
    }
    return null
  }

  isAuthenticated(): boolean {
    const token = this.getToken()
    if (token) {
      const expired = this.jwtHelper.isTokenExpired(token)
      return !expired
    }
    return false
  }

  save(user: User): Observable<any> {
    return this.http.post<any>(this.apiURL, user)
  }

  tryToLogin(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password')

    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.http.post(this.tokenURL, params.toString(), {headers})
  }
}
