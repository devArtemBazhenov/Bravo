import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authorizationUrl = "http://localhost:3000/auth/authorization"
  private checkcodeauthorize = "http://localhost:3000/auth/checkcodeauthorize"
  constructor(private http: HttpClient) { }

  //go to server

  public authorization(user: object) {
    return this.http.post(this.authorizationUrl, user)
  }

  public checkuthorize(userCode: object) {
    return this.http.post(this.checkcodeauthorize, userCode)
  }

  public getLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  public getToken(): string | null {
    return localStorage.getItem('token')
  }

}
