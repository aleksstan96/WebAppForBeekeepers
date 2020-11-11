import { Component, OnInit } from '@angular/core';
import { Porudzbina, Proizvod } from '../data/proizvod';
import { LoginService } from '../servisi/login.service';
import { PorudzbinaService } from '../servisi/porudzbina.service';
import { ProizvodiService } from '../servisi/proizvodi.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  userId = 0;

  //role
  role: string

  myCart: Proizvod[] = []

  myHistory: Porudzbina[] = []

  constructor(private servis: PorudzbinaService, private proizvoidServis: ProizvodiService,
    private loginService: LoginService) { }

  ngOnInit(): void {

    this.role = localStorage.getItem('role')
    this.myCart = JSON.parse(localStorage.getItem('myCart'))
    this.userId = +localStorage.getItem('userId')
    this.servis.dohvatiPorudzbineUsera(this.userId).subscribe(
      res=>{
        this.myHistory = res
        this.myHistory.forEach(por => {
          this.proizvoidServis.dohvatiProizvod(por.proizvodId).subscribe(
            data=>{
              por.prizvod = data
            }
          )
        });
      }
    )
  }

  logout(){
    this.loginService.logout()
  }


}
