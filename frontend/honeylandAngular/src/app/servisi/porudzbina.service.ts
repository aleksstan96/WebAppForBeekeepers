import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Porudzbina } from '../data/proizvod';
import { BASE_URL } from '../global';

@Injectable({
  providedIn: 'root'
})
export class PorudzbinaService {

  constructor(private httpClient: HttpClient) { }


  dohvatiPorudzbineUProteklihMesecDana(userId, startDate, endDate)
  : Observable<Porudzbina[]>
  {
    
  //  endDate.setMonth(endDate.getMonth()+1)
   // console.log(startDate.getFullYear(),startDate.getMonth()+1,startDate.getDate(), endDate.getMonth())
    const url = `${BASE_URL}/porudzbine/search/findByPcelarIdAndDatumBetween?id=${userId}&startDate=${startDate.getFullYear()}/${startDate.getMonth()+1}/${startDate.getDate()}&endDate=${endDate.getFullYear()}/${endDate.getMonth()+1}/${endDate.getDate()+1}`;
   // console.log(url)
    return this.httpClient.get<GetResponsePorudzbina>(url).pipe(
      map(result=> result._embedded.porudzbine)
    );
  }

  dohvatiPorudzbineUsera(userId): Observable<Porudzbina[]>{
    const url = `${BASE_URL}/porudzbine/search/findByUserId?id=${userId}&sort=datum`
    return this.httpClient.get<GetResponsePorudzbina>(url).pipe(
      map(result=> result._embedded.porudzbine)
    );
  }

  dohvatiPorudzbineUseraIProizvoda(userId, proizvodId): Observable<Porudzbina[]>{
    const url = `${BASE_URL}/porudzbine/search/findByUserIdAndProizvodId?uid=${userId}&pid=${proizvodId}`
    return this.httpClient.get<GetResponsePorudzbina>(url).pipe(
      map(result=> result._embedded.porudzbine)
    );
  }


}


interface GetResponsePorudzbina {
  _embedded: {
    porudzbine: Porudzbina[];
  }
}
