import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Porudzbina, Proizvod } from '../data/proizvod';
import { BASE_URL } from '../global';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private http: HttpClient) { }



  proslediPorudzbinu(por: Porudzbina): Observable<Porudzbina>{
    const url =`${BASE_URL}/porudzbine`;
    return this.http.post<Porudzbina>(url, por)


    
  }
}
