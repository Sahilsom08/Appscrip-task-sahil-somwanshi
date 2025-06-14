import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interface/data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(public http: HttpClient) {}
  private API_URL = 'https://fakestoreapi.com/';

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL}/products`);
  }
}
