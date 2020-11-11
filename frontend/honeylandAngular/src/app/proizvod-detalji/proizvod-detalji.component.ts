import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Proizvod } from '../data/proizvod';
import { ProizvodiService } from '../servisi/proizvodi.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../servisi/login.service';
import { Pcelar } from '../data/user';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { JeOcenio } from '../data/jeocenio';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { PorudzbinaService } from '../servisi/porudzbina.service';

@Component({
  selector: 'app-proizvod-detalji',
  templateUrl: './proizvod-detalji.component.html',
  styleUrls: ['./proizvod-detalji.component.css']
})
export class ProizvodDetaljiComponent implements OnInit {

  @ViewChild('rejtingModal', { static: false }) rejtingModal: ModalDirective; 

  proizvodId : number = 0
  proizvod: Proizvod = new Proizvod();
  role: string = "";
  cnt:number = 0; //ovako odredjujem da li je korisnik narucivao proizvod
  
   //slike
   selectedFile: File;
   retrievedImage: any;
   imageShowName: string = ''
   imageShow: any;
   base64Data: any;
   retrieveResonse: any;
   message: string;
   imageName: any;

   //rejting
   ocene: JeOcenio[] = [];
   rejtinzi: Rejting[]=[];
   mojaOcena: number=0;
   mojKomentar: string="";
   kupacId: number = 0
   userId: number =0
 

   myCart: Proizvod[] = []

  constructor(  private loginServis: LoginService,
              public activatedRoute: ActivatedRoute,
              private service :ProizvodiService,
              private porService: PorudzbinaService, 
              private httpClient: HttpClient,
              config: NgbRatingConfig) { config.max = 5 }

  ngOnInit(): void {
    this.myCart = JSON.parse(localStorage.getItem('myCart'))
    this.role = localStorage.getItem('role')
    this.userId = +localStorage.getItem('userId')
   
    if(this.role=='c'){
      this.kupacId = +localStorage.getItem('cId')
    }
    // this.ulogaKorisnika = sessionStorage.getItem('authenticatedUserRole')
    this.proizvodId = +this.activatedRoute.snapshot.paramMap.get('id')
    this.service.dohvatiProizvod(this.proizvodId).subscribe(
      res=>{
        this.proizvod = res;
         //dohvatanje pcelara
         this.httpClient.get<Pcelar>(`http://localhost:8080/proizvodi/${this.proizvod.id}/pcelar`).subscribe(
          res=>{
            this.proizvod.pcelar = res
          }
        )
        //dohvatanje slike
        this.httpClient.get('http://localhost:8080/image/get/' + this.proizvod.slika)
        .subscribe(
          res => {
            //dohvatanje slike
            this.retrieveResonse = res;
            this.base64Data = this.retrieveResonse.picByte;
            this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
            this.proizvod.slikaShow = this.retrievedImage


          }
        );

        //dohvatanje ocena
        this.dohvatiOcene()
        this.jeNarucivao()
      }
    )
  }

  logout(){
    this.loginServis.logout()
  }

  showRejtingModal(){
    this.rejtingModal.show()

  }

  hideRejtingModal(){
    this.rejtingModal.hide()
    this.ngOnInit()
  }

 //dohvata recenzije proizvoda
 dohvatiOcene(){
  this.rejtinzi=[]
  this.service.dohvatiOcene(this.proizvod.id).subscribe(
    data=>{
      this.ocene=data;
     
      //za svaku ocenu on dohvata username korisnika koji je dao tu ocenu
      for(let temp of this.ocene){
       
        this.loginServis.getKupac(this.kupacId).subscribe(
          data=>{
            let rejting: Rejting = new Rejting();
            rejting.ocena = temp.ocena;
            rejting.komentar = temp.komentar;
            rejting.ime = data.ime;
            rejting.prezime = data.prezime
            this.rejtinzi.push(rejting);
          }
        )
      }

    }
  )
}

jeNarucivao(){
  this.cnt=0
  this.porService.dohvatiPorudzbineUseraIProizvoda(this.userId, this.proizvod.id).subscribe(
    res=>{
    
      if(res.length>0){
        this.cnt++
      }
    }
  )

 
}


oceni(){
    if(this.mojaOcena==0){
      this.message="Add a review!"
    }else if(this.mojKomentar==""){
      this.message="Comment is required!";
    }else if(this.cnt==0){
      this.message="You have not ordered this product yet!"
    }else{
      
      this.service.jeOcenio(this.proizvod.id,this.kupacId).subscribe(
        data=>{
          if(data.length>0){
            this.message="You already gave a review!"
          }else{ //SVE JE OK I MOZE DA OCENI
            
            this.service.oceni(this.proizvod.id, this.kupacId, this.mojKomentar,this.mojaOcena).subscribe(
              data=>{
                this.ngOnInit()
                //this.dialogRef.close();
              }
            )
  
          }
        }
      )
    }
    
  }


  dodajUKorpu(proivod: Proizvod, kolicina: number){
  //  console.log(proivod,kolicina)
  // if(kolicina<1) 
  //   alert("Kolicina mora biti veca od 0!")
  // else
  //   this.service.dodajUKorpu(proivod,kolicina)
  }

}


interface ProizvodState{
  proizvod: Proizvod;
  role: string;
}

class Rejting{
  ocena: number;
  komentar: string;
  ime:string;
  prezime:string;
}