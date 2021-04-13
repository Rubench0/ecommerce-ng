import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public baseUrl: string = environment.baseUrl;
  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) { }

  isLogged(){
    let auth = localStorage.getItem('access_token') ? true : false;
    return auth;
  }

  signIn(form){
    const body = { email: form.value.email, password: form.value.password};
		return this._http.get(`${this.baseUrl}login`, {
      params: body
    });
  }

  signOut(){
    localStorage.clear();
    this._router.navigate(['/auth/signin']);
  }

}
