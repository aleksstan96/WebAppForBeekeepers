import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Dogadjaj } from './event';

@Injectable({
  providedIn: 'root'
})
export class ServisService {

  constructor(private http: HttpClient) { }

  dohvatiDogadjaje(): Observable<Dogadjaj[]>{
    return this.http.get<GetResponseEvent>('http://localhost:8080/dogadjaji').pipe(
      map(response=>response._embedded.dogadjaji)
    )

  }

}


interface GetResponseEvent{
  _embedded:{
    dogadjaji: Dogadjaj[]
  }
}