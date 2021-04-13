import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  public baseUrl: string = environment.baseUrl;
  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) { }

  getOrders(delivery_date) {
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });
    const body = (delivery_date) ? { delivery_date: delivery_date } : {};
    return this._http.get(`${this.baseUrl}orders`, {
        headers: headers,
        params: body
    });
  }

  getOrder(id: number) {
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });
    return this._http.get(`${this.baseUrl}orders/${id}`, {
        headers: headers
    });
  }

}
