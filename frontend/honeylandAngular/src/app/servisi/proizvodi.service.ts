import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JeOcenio } from '../data/jeocenio';
import { Proizvod, ProizvodPost } from '../data/proizvod';
import { BASE_URL } from '../global';

@Injectable({
  providedIn: 'root'
})
export class ProizvodiService {

  constructor(private http: HttpClient) { }


  dohvatiProizvod(id): Observable<Proizvod>{
    const url =`${BASE_URL}/proizvodi/${id}`;

    return this.http.get<Proizvod>(url)
  }

  dohvatiProizvodePoNazivu(thePage: number, thePageSize: number, naziv: string): Observable<GetResponseproizvodiPagination>{
    const url =`${BASE_URL}/proizvodi/search/findByNazivContaining`
    + `?name=${naziv}&page=${thePage}&size=${thePageSize}`;

    return this.http.get<GetResponseproizvodiPagination>(url)
  }

  dohvatiProizvodePaginacijaKategorija(thePage: number, thePageSize: number, kategorija: string): Observable<GetResponseproizvodiPagination>{
    const url =`${BASE_URL}/proizvodi/search/findByKategorija`
    + `?kategorija=${kategorija}&page=${thePage}&size=${thePageSize}`;

    return this.http.get<GetResponseproizvodiPagination>(url)
  }

  dohvatiProizvodePaginacija(thePage: number, thePageSize: number): Observable<GetResponseproizvodiPagination>{
    const url =`${BASE_URL}/proizvodi`
    + `?page=${thePage}&size=${thePageSize}`;

    return this.http.get<GetResponseproizvodiPagination>(url)
  }
  

  dohvatiProizvode(pcelarid): Observable<Proizvod[]>{
    const url =`${BASE_URL}/proizvodi/search/findByPcelarId?id=${pcelarid}`;

    return this.http.get<GetResponseproizvodi>(url).pipe(
      map(response=>response._embedded.proizvodi)
    )
  }

  dohvatiProizvodeKategorija(kategorija): Observable<Proizvod[]>{
    const url =`${BASE_URL}/proizvodi/search/findByPcelarId?kategorija=${kategorija}`;

    return this.http.get<GetResponseproizvodi>(url).pipe(
      map(response=>response._embedded.proizvodi)
    )
  }


  dohvatiProizvodeNazivAsc(naziv): Observable<Proizvod[]>{
    const url =`${BASE_URL}proizvodi/search/findByNazivContaining?name=${naziv}`;

    return this.http.get<GetResponseproizvodi>(url).pipe(
      map(response=>response._embedded.proizvodi)
    )
  }

  

  izmeniProizvod(p:Proizvod, pcelarId:number): Observable<Object>{
   
    const url = `${BASE_URL}/proizvodi/update/${p.id}/${pcelarId}/${p.naziv}/${p.info}/${p.cena}/${p.kolicina}/${p.slika}/${p.kategorija}/${p.ocena}/${p.brOcena}`
    return this.http.get(url);
  }

  obrisiProizvod(proizvodId):Observable<{}>{
    const url = `${BASE_URL}/proizvodi/delete/${proizvodId}`;
    return this.http.get(url);
  }

  dodajProizvod(proizvod: ProizvodPost): Observable<Proizvod>{
    const url =`${BASE_URL}/proizvodi`;

    return this.http.post<Proizvod>(url, proizvod)
  }

  dohvatiOcene(idProizvoda): Observable<JeOcenio[]>{
    const url = `${BASE_URL}/jeocenio/search/findByProizvodId?id=${idProizvoda}`;
    return this.http.get<GetResponseOcene>(url).pipe(
      map(response=> response._embedded.jeocenio)
    )

  }

  oceni(proId, kupacId, komentar, ocena){
    const url = `${BASE_URL}/jeocenio/create/${proId}/${kupacId}/${komentar}/${ocena}`;
    return this.http.get(url);
  }

  jeOcenio(idProizvoda, kupacId): Observable<JeOcenio[]>{
    
    const url = `${BASE_URL}/jeocenio/search/findByKupacIdAndProizvodId?kid=${kupacId}&pid=${idProizvoda}`;
    return this.http.get<GetResponseOcene>(url).pipe(
      map(response=> response._embedded.jeocenio)
    )
  }

}


interface GetResponseproizvodi{
  _embedded:{
    proizvodi: Proizvod[]
  }
}

interface GetResponseproizvodiPagination{
  _embedded:{
    proizvodi: Proizvod[]
  },
  page : {
    size : number,
    totalElements : number,
    totalPages : number,
    number : number
  }
}

interface GetResponseOcene{
  _embedded:{
    jeocenio: JeOcenio[]
  }
}