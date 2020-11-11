import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../global';
import { map } from 'rxjs/operators';
import { Pcelinjak, PcelinjakPost } from '../data/pcelinjak';
import { Kosnica, KosnicaPost } from '../data/kosnice';

@Injectable({
  providedIn: 'root'
})
export class PcelinjakService {

  constructor(private http: HttpClient) { }


  dohvatiPcelinjake(pcelarid): Observable<Pcelinjak[]>{
    const url =`${BASE_URL}/pcelinjaci/search/findByPcelarId?id=${pcelarid}`;
    return this.http.get<GetResponsePcelinjaci>(url).pipe(
      map(response=>response._embedded.pcelinjaci)
    )
  }
 
  dodajPcelinjak(pcelinjak: PcelinjakPost): Observable<Pcelinjak>{
    const url =`${BASE_URL}/pcelinjaci`;

    return this.http.post<Pcelinjak>(url, pcelinjak)
  }
  
  dohvatiPcelinjakePaginacija(thePage: number, thePageSize: number, pcelarid): Observable<GetResponsePcelinjaciPagination>{
    const url =`${BASE_URL}/pcelinjaci/search/findByPcelarId?id=${pcelarid}`
    + `&page=${thePage}&size=${thePageSize}`;

    return this.http.get<GetResponsePcelinjaciPagination>(url)
  }

 


  izmeniPcelinjak(p:Pcelinjak, pcelarId:number): Observable<Object>{
    const url = `${BASE_URL}/pcelinjaci/update/${p.id}/${pcelarId}/${p.naziv}/${p.brojKosnica}/${p.lokacija}`
    return this.http.get(url);
  }

  obrisiPcelinjak(pcelinjakId):Observable<{}>{
    const url = `${BASE_URL}/pcelinjaci/delete/${pcelinjakId}`;
    return this.http.get(url);
  }




  ///////kosnice

  dohvatiKosnice(pcelinjakId): Observable<Kosnica[]>{
    const url =`${BASE_URL}/kosnice/search/findByPcelinjakId?id=${pcelinjakId}`;

    return this.http.get<GetResponseKosnice>(url).pipe(
      map(response=>response._embedded.kosnice)
    )
  }

  dodajKosnicu(kosnica: KosnicaPost): Observable<Kosnica>{
    const url =`${BASE_URL}/kosnice`;

    return this.http.post<Kosnica>(url, kosnica)
  }

  updateKosnicaPcelinjak(kosnicaId:number, pcelinjakId: number){
    const url =`${BASE_URL}/kosnice/updateId/${kosnicaId}/${pcelinjakId}`;
    return this.http.get(url);
  }

  obrisiKosnicu(kosnicaId){
    const url = `${BASE_URL}/kosnice/delete/${kosnicaId}`;
    return this.http.get(url);

  }

  izmeniKosnicu(idKosnice: number, pcelinjakId: number, rbr:  number, vrsta: string, velicinaHranilice: number, starostMatice: number, velicinaLegla: number, opsteStanje: string, temperatura: number): Observable<Object>{
  
    let url = "";
    if(opsteStanje!=''){
      
      url =  `${BASE_URL}/kosnice/update/${idKosnice}/${pcelinjakId}/${rbr}/${vrsta}/${velicinaHranilice}/${velicinaLegla}/${temperatura}/${opsteStanje}/${starostMatice}` 

   }else{
      url =  `${BASE_URL}/kosnice/update/${idKosnice}/${pcelinjakId}/${rbr}/${vrsta}/${velicinaHranilice}/${velicinaLegla}/${temperatura}/${starostMatice}` 
   }
 
   return this.http.get(url);
  }




}

interface GetResponsePcelinjaci{
  _embedded:{
    pcelinjaci: Pcelinjak[]
  }
}

interface GetResponseKosnice{
  _embedded:{
    kosnice: Kosnica[]
  }
}

interface GetResponsePcelinjaciPagination{
  _embedded:{
    pcelinjaci: Pcelinjak[]
  },
  page : {
    size : number,
    totalElements : number,
    totalPages : number,
    number : number
  }
}