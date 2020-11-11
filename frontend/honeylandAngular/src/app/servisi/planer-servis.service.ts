import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dogadjaj, DogadjajPost } from '../data/dogadjaj';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BASE_URL } from '../global';
import { Subscription } from '../data/subscription';

@Injectable({
  providedIn: 'root'
}) 
export class PlanerServisService {

  constructor(private http: HttpClient) { }

  dohvatiDogadjaje(pcelarId): Observable<Dogadjaj[]>{
    const url =`${BASE_URL}/dogadjaji/search/findByPcelarId?id=${pcelarId}`;

    return this.http.get<GetResponseDogadjaj>(url).pipe(
      map(response=>response._embedded.dogadjaji)
    )

  }

  dohvatiDogadjajeFuture(thePage: number, thePageSize: number): Observable<GetResponseDogadjajPaginacija>{
    let date = new Date()
    const url = `${BASE_URL}/dogadjaji/search/findByDatumPocetkaAfter?date=${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}&page=${thePage}&size=${thePageSize}`;
    return this.http.get<GetResponseDogadjajPaginacija>(url)
  }

  // dohvatiDogadjajeEventsAsc(): Observable<Dogadjaj[]>{
  //   const url =`${BASE_URL}/dogadjaji/search/findByStatus?status=MyEvent&sort=datumPocetka`;

  //   return this.http.get<GetResponseDogadjaj>(url).pipe(
  //     map(response=>response._embedded.dogadjaji)
  //   )

  // }

  dohvatiDogadjajeEvents(thePage: number, thePageSize: number,vreme): Observable<GetResponseDogadjajPaginacija>{
    const url =`${BASE_URL}/dogadjaji/search/findByStatus?status=MyEvent&sort=datumPocetka,${vreme}&page=${thePage}&size=${thePageSize}`;

    return this.http.get<GetResponseDogadjajPaginacija>(url)
 

  }

  // dohvatiDogadjajeNazivAsc(naziv): Observable<Dogadjaj[]>{
  //   const url =`${BASE_URL}/dogadjaji/search/findByNazivContaining?name=${naziv}`;

  //   return this.http.get<GetResponseDogadjaj>(url).pipe(
  //     map(response=>response._embedded.dogadjaji)
  //   )
  // }

  dohvatiDogadjajeNaziv(thePage: number, thePageSize: number,naziv, vreme): Observable<GetResponseDogadjajPaginacija>{
    const url =`${BASE_URL}/dogadjaji/search//findByStatusAndNazivContaining?status=MyEvent&name=${naziv}&sort=datumPocetka,${vreme}&page=${thePage}&size=${thePageSize}`;

    return this.http.get<GetResponseDogadjajPaginacija>(url)
  }

  dohvatiDogadjajeGradFuture(thePage: number, thePageSize: number,grad, vreme): Observable<GetResponseDogadjajPaginacija>{
    let date = new Date()
    const url =`${BASE_URL}/dogadjaji/search/findByStatusAndLokacijaContainingAndDatumPocetkaAfter?status=MyEvent&name=${grad}&date=${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}&sort=datumPocetka,${vreme}&page=${thePage}&size=${thePageSize}`;

    return this.http.get<GetResponseDogadjajPaginacija>(url)
  }

  dohvatiDogadjajeGrad(thePage: number, thePageSize: number,grad, vreme): Observable<GetResponseDogadjajPaginacija>{
  
    const url =`${BASE_URL}/dogadjaji/search/findByStatusAndLokacijaContaining?status=MyEvent&name=${grad}&sort=datumPocetka,${vreme}&page=${thePage}&size=${thePageSize}`;

    return this.http.get<GetResponseDogadjajPaginacija>(url)
  }


  // dohvatiDogadjajeGradDesc(naziv): Observable<Dogadjaj[]>{
  //   const url =`${BASE_URL}/dogadjaji/search/findByLokacijaContaining?name=${naziv}&sort=datumPocetka,desc`;

  //   return this.http.get<GetResponseDogadjaj>(url).pipe(
  //     map(response=>response._embedded.dogadjaji)
  //   )
  // }


  dodajDogadjaj(dogadjaj: DogadjajPost): Observable<Dogadjaj>{
    const url =`${BASE_URL}/dogadjaji`;
    return this.http.post<Dogadjaj>(url, dogadjaj)
  }

  izmeniDogadjaj(dogadjaj: Dogadjaj, pcelarId: number): Observable<{}>{
    const url =`${BASE_URL}/dogadjaji/update/${dogadjaj.id}/${pcelarId}/${dogadjaj.naziv}/${dogadjaj.datumPocetka}/${dogadjaj.datumKraja}/${dogadjaj.lokacija}/${dogadjaj.opis}/${dogadjaj.status}`;
    return this.http.get(url);
  }

  obrisiDogadjaj(dogadjajId):Observable<{}>{
    const url = `${BASE_URL}/dogadjaji/delete/${dogadjajId}`;
    return this.http.get(url);

  }

  dohvatiPcelareSubscribe(myId): Observable<Subscription[]>{
    const url = `${BASE_URL}/subscriptions/search/findByUser1Id?id=${myId}`;
    return this.http.get<GetResponseSubscription>(url).pipe(
      map(response=>response._embedded.subscriptions)
    )
  }

  dohvatiSubscribeKorisnike(myId): Observable<Subscription[]>{
    const url = `${BASE_URL}/subscriptions/search/findByUser2Id?id=${myId}`;
    return this.http.get<GetResponseSubscription>(url).pipe(
      map(response=>response._embedded.subscriptions)
    )
  }

  
  sendMail(poljId: number, pcelar:string){
    const url =`${BASE_URL}/eventmail/${poljId}/${pcelar}`;
    return this.http.get(url);
  }

  subscribe(usr1, usr2): Observable<Subscription>{

    let s = new SubscriptionPost();
    s.user1Id = usr1;
    s.user2Id = usr2;
    const url =`${BASE_URL}/subscriptions`;
    return this.http.post<Subscription>(url, s)
  }

  getSubscription(id1, id2): Observable<Subscription[]>{
    const url = `${BASE_URL}/subscriptions/search/findByUser1IdAndUser2Id?id1=${id1}&id2=${id2}`;
    return this.http.get<GetResponseSubscription>(url).pipe(
      map(response=>response._embedded.subscriptions)
    )
  }


  unsubscribe(id){
    
    const url =`${BASE_URL}/subscriptions/delete/${id}`;
    return this.http.get(url);

  }

  


}


interface GetResponseDogadjaj{
  _embedded:{
    dogadjaji: Dogadjaj[]
  }
}

interface GetResponseDogadjajPaginacija{
  _embedded:{
    dogadjaji: Dogadjaj[]
  },
  page : {
    size : number,
    totalElements : number,
    totalPages : number,
    number : number
  }
}

interface GetResponseSubscription{
  _embedded:{
    subscriptions: Subscription[]
  }
}

class SubscriptionPost{
  user1Id: number;
    user2Id: number; //pcelarId
}

