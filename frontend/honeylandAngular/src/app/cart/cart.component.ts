import { Component, OnInit } from '@angular/core';
import { Porudzbina, Proizvod } from '../data/proizvod';
import { LoginService } from '../servisi/login.service';
import { ShoppingCartService } from '../servisi/shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  ukupanIznos: number = 0;
  userId = 0;
  role=""
  
  myCart: Proizvod[] = []
  

  selectedValue = null;
  
  prosledjena: boolean

  constructor(private service: ShoppingCartService,  private loginService: LoginService) { }

  ngOnInit(): void {
    this.prosledjena = false;
    this.userId = +localStorage.getItem('userId')
    this.role = localStorage.getItem('role')
    this.myCart = JSON.parse(localStorage.getItem('myCart'))
    this.ukupanIznos=0
    this.myCart.forEach(element => {
      this.ukupanIznos+=element.kolicina*element.cena
    });
  
    
  }

  proslediPorudzbinu(){
  
    this.myCart.forEach(p => {
      let por = new Porudzbina()
      por.proizvodId=p.id
      por.kolicina = p.kolicina
      por.datum = new Date()
      por.userId = this.userId
      this.service.proslediPorudzbinu(por).subscribe(
        res=>{
          this.remove(p)
        }
      )
    });

    ///TREBA I KOD PROIZVODA SMANJITI KOLICINU
    this.prosledjena=true
  
  }

  logout(){
    this.loginService.logout()
  }



  remove(proizvod:Proizvod){
    this.myCart = JSON.parse(localStorage.getItem('myCart'))
    let cnt=0
    this.myCart.forEach(element => {
      if(element.id==proizvod.id){
        this.myCart.splice(cnt,1)
      }
      cnt++
    });
    this.ukupanIznos=0
    this.myCart.forEach(element => {
      this.ukupanIznos+=element.kolicina*element.cena
    });

    localStorage.setItem('myCart', JSON.stringify(this.myCart))
    
  }


}
