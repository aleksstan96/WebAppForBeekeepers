import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Pcelar, Kupac, UserRequest } from '../data/user';
import { BASE_URL } from '../global';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Zahtev } from '../data/zahtev';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router,private http : HttpClient) { }

  dohvatiSveZahteve(): Observable<Zahtev[]>{
    const url = `${BASE_URL}/zahtevi`
    return this.http.get<GetResponseZahtevi>(url).pipe(
      map(res=>res._embedded.zahtevi)
    )
  }

  potvrdiZahtev(id){
    const url = `${BASE_URL}/zahtevi/prihvati/${id}`;
    return this.http.get(url);
  }

  odbijZahtev(id){
    const url = `${BASE_URL}/zahtevi/odbij/${id}`;
    return this.http.get(url);
  }

  login(username, password): Observable<User[]>{
    const url = `${BASE_URL}/users/search/findByUsernameAndPassword?username=${username}&password=${password}`
    return this.http.get<GetResponseUsers>(url).pipe(
      map(response=>response._embedded.users)
    )
  }

  findUserByUsername(username):Observable<User[]>{
    const url = `${BASE_URL}/users/search/findByUsername?username=${username}`
    return this.http.get<GetResponseUsers>(url).pipe(
      map(response=>response._embedded.users)
    )
  }

  findUser(id):Observable<User>{
    const url = `${BASE_URL}/users/${id}`
    return this.http.get<User>(url)
 
  }

  updateUser(user: User): Observable<User>{
    const url =`${BASE_URL}/users/update/${user.id}`;

    return this.http.post<User>(url, user)
  }


  posaljiRegZahtev(zahtev): Observable<UserRequest>{
    const url = `${BASE_URL}/zahtevi`
    return this.http.post<UserRequest>(url,zahtev)
  }

  getPcelar(id):  Observable<Pcelar>{
    const url = `${BASE_URL}/pcelari/${id}`
    return this.http.get<Pcelar>(url)

  }

  getKupac(id):  Observable<Kupac>{
    const url = `${BASE_URL}/kupci/${id}`
    return this.http.get<Kupac>(url)

  }


  findPcelarByUserId(userId): Observable<Pcelar>{

    const url = `${BASE_URL}/pcelari/search/findByUserId?id=${userId}`
    return this.http.get<GetResponsePcelari>(url).pipe(
      map(response=>response._embedded.pcelari[0])
    )

  }

  findKupacByUserId(kupacId): Observable<Kupac>{

    const url = `${BASE_URL}/kupci/search/findByUserId?id=${kupacId}`
    return this.http.get<GetResponseKupci>(url).pipe(
      map(response=>response._embedded.kupci[0])
    )

  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('')
  }
}


interface GetResponseUsers{
  _embedded: {
    users: User[]
  }
}

interface GetResponseKupci{
  _embedded: {
    kupci: Kupac[]
  }
}

interface GetResponsePcelari{
  _embedded: {
    pcelari: Pcelar[]
  }
}

interface GetResponseZahtevi{
  _embedded: {
    zahtevi: Zahtev[]
  }
}
