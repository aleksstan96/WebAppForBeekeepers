import { Component, OnInit } from '@angular/core';
import { Zahtev } from '../data/zahtev';
import { LoginService } from '../servisi/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  zahtevi: Zahtev[] = []

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.dohvatiSveZahteve().subscribe(
      res=>{
        this.zahtevi = res
      }
    )
  }

  logout(){
    this.loginService.logout()
  }

  prihvati(id){
    this.loginService.potvrdiZahtev(id).subscribe(
      res=>{
        this.ngOnInit()
      }
    )

  }

  odbij(id){
    this.loginService.odbijZahtev(id).subscribe(
      res=>{
        this.ngOnInit()
      }
    )
  }


}
