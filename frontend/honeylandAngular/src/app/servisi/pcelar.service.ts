import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pcelar } from '../data/user';
import { BASE_URL } from '../global';

@Injectable({
  providedIn: 'root'
})
export class PcelarService {

  constructor(private http: HttpClient) { }


  getPcelar(id):  Observable<Pcelar>{
    const url = `${BASE_URL}/pcelari/${id}`
    return this.http.get<Pcelar>(url)

  }

  updatePcelarProfileImage(id, slika): Observable<{}>{
    
    const url = `${BASE_URL}/pcelari/update/${slika}/${id}`
    
    return this.http.get(url)
  }

  updatePcelarGallery(id, slike): Observable<{}>{
    
    const url = `${BASE_URL}/pcelari/updateG/${slike}/${id}`
   // console.log(url)
    
    return this.http.get(url)
  }

  updatePcelar(p: Pcelar): Observable<Pcelar>{
    const url =`${BASE_URL}/pcelari/update/${p.id}`;

    return this.http.post<Pcelar>(url, p)
  }

 
}
