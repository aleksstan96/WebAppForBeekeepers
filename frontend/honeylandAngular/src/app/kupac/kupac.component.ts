import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Dogadjaj } from '../data/dogadjaj';
import { Proizvod } from '../data/proizvod';
import { Pcelar } from '../data/user';
import { BASE_URL } from '../global';
import { LoginService } from '../servisi/login.service';
import { PlanerServisService } from '../servisi/planer-servis.service';

@Component({
  selector: 'app-kupac',
  templateUrl: './kupac.component.html',
  styleUrls: ['./kupac.component.css']
})
export class KupacComponent implements OnInit {

  //role
  role: string

  userId: number = 0;
  bId: number = 0;
  cId: number= 0;

  //events
  dogadjaji: Dogadjaj[] = []
  gradovi: string[] = []

  //paginacija
  thePageNumber: number = 1;
  thePageSize: number = 3;
  theTotalElements: number = 0;

  //kategorije
  currCategory = 'All'

  //vreme i grad
  vreme= ''
  grad= 'EveryCity'
  criteria ='future'

  //
  following: number[]=[]

  myCart: Proizvod[] = []
  

  constructor(private servis: PlanerServisService,
              private httpClient: HttpClient,
              private loginService: LoginService
    ) { }

  ngOnInit(): void {
    this.vreme = 'asc'
    this.currCategory = 'All'
    this.role = localStorage.getItem('role')
    this.userId = +localStorage.getItem('userId')
    if(this.role=='b'){
      this.bId = +localStorage.getItem('bId')
    }else if(this.role=='c'){
      this.cId = +localStorage.getItem('cId')
    } 
    this.init()
    this.getPcelareSubscribed()
    this.myCart = JSON.parse(localStorage.getItem('myCart'))
  } 

  getPcelareSubscribed(){
    this.following = []
    this.servis.dohvatiPcelareSubscribe(this.userId).subscribe(
      res=>{
        res.forEach(element => {
          this.following.push(element.user2Id)
        });
      }
    )
  }

  logout(){
    this.loginService.logout()
  }

  isMe(id):boolean{
    return id==this.bId
  }

  
  subscribe(pcelarid){

    this.servis.subscribe(this.userId, pcelarid).subscribe(
      res=>{
       
        this.getPcelareSubscribed()
      }
    )

  }

  unsubscribe(pcelarid){
    
    this.servis.getSubscription(this.userId, pcelarid).subscribe(
      res=>{
        this.servis.unsubscribe(res[0].id).subscribe(
          res=>{
            this.getPcelareSubscribed()
          }
        )
      }
    )
    
  }




  isSubscribed(id): boolean{

    let flw = false
    this.following.forEach(f => {
      if(id==f){
        flw=true
      }
    });
    return flw
  }

  init() {
    this.servis.dohvatiDogadjajeEvents(0, 100,"asc").subscribe(
      res => {
        let ima = false;
        res._embedded.dogadjaji.forEach(d => {
          this.gradovi.forEach(g => {
            if (d.lokacija == g) {
              ima = true;
            }
          })
          if (!ima) {
            this.gradovi.push(d.lokacija)
          } else {
            ima = false
          }

          this.getEventsFuture();
        });
      }
    )
  }

  getEvents(){
    this.servis.dohvatiDogadjajeEvents(this.thePageNumber - 1, this.thePageSize,this.vreme).subscribe(
      res=>{
        this.dogadjaji=res._embedded.dogadjaji
        this.thePageNumber = res.page.number + 1;
        this.thePageSize = res.page.size;
        this.theTotalElements = res.page.totalElements;
        this.dogadjaji.forEach(d => {
          this.httpClient.get<Pcelar>(`${BASE_URL}/dogadjaji/${d.id}/pcelar`).subscribe(
            res=>{
            
              d.pcelar = res
            }
          )
          
        });
      }
    )
  }


  getEventsCity(){

    if(this.criteria=='future'){
        if(this.grad!='EveryCity'){
                this.servis.dohvatiDogadjajeGradFuture(0, this.thePageSize,this.grad,this.vreme).subscribe(
                res=>{
                  this.dogadjaji=res._embedded.dogadjaji
                  this.thePageNumber = res.page.number + 1;
                  this.thePageSize = res.page.size;
                  this.theTotalElements = res.page.totalElements;
                  this.dogadjaji.forEach(d => {
                    this.httpClient.get<Pcelar>(`${BASE_URL}/dogadjaji/${d.id}/pcelar`).subscribe(
                      res=>{
                        d.pcelar = res
                      }
                    )
                    
                  });
                }
              )
            }else{
              this.getEventsFuture()
            }
    }else{

      if(this.grad!='EveryCity'){
        this.servis.dohvatiDogadjajeGrad(0, this.thePageSize,this.grad,this.vreme).subscribe(
        res=>{
          this.dogadjaji=res._embedded.dogadjaji
          this.thePageNumber = res.page.number + 1;
          this.thePageSize = res.page.size;
          this.theTotalElements = res.page.totalElements;
          this.dogadjaji.forEach(d => {
            this.httpClient.get<Pcelar>(`${BASE_URL}/dogadjaji/${d.id}/pcelar`).subscribe(
              res=>{
                d.pcelar = res
              }
            )
            
          });
        }
      )
    }else{
      this.getEvents()
    }

    }

    
    
  }

  getEventsFuture(){
    this.servis.dohvatiDogadjajeFuture(this.thePageNumber - 1, this.thePageSize).subscribe(
      res=>{
        this.dogadjaji=res._embedded.dogadjaji
        this.thePageNumber = res.page.number + 1;
        this.thePageSize = res.page.size;
        this.theTotalElements = res.page.totalElements;
        this.dogadjaji.forEach(d => {
          this.httpClient.get<Pcelar>(`${BASE_URL}/dogadjaji/${d.id}/pcelar`).subscribe(
            res=>{
            
              d.pcelar = res
            }
          )
          
        });
      }
    )
  }


}


  // getEventsName(naziv){
  //   this.servis.dohvatiDogadjajeNaziv(0, this.thePageSize,naziv, this.vreme).subscribe(
  //     res=>{
  //       this.dogadjaji=res._embedded.dogadjaji
  //       this.thePageNumber = res.page.number + 1;
  //       this.thePageSize = res.page.size;
  //       this.theTotalElements = res.page.totalElements;
  //     }
  //   )
  // }


  // setCategory(k: string) {
  //   this.currCategory = k;

  //   switch (k) {
  //     case 'All':
  //       this.getEvents();
  //       break;
  //     case 'Degustation':
  //     this.getEventsName('Degustation');
  //       break;
  //     case 'Fair':
  //       this.getEventsName('Fair');
  //       break;
  //     case 'Seminar':
  //       this.getEventsName('Seminar');
  //       break;
  //     default:
  //       break;
  //   }
  // }
