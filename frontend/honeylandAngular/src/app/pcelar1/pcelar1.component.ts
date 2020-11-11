import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pcelar } from '../data/user';
import { LoginService } from '../servisi/login.service';

@Component({
  selector: 'app-pcelar1',
  templateUrl: './pcelar1.component.html',
  styleUrls: ['./pcelar1.component.css']
})
export class Pcelar1Component implements OnInit {
  buttonId = 1 //sluzi da znamo koje je trenutno dugme na side meniju obelezeno

  pcelarId;
  pcelar: Pcelar = new Pcelar()

  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  profilePicture: any;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private loginServis: LoginService,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.fokus1();
    this.pcelarId = +localStorage.getItem('bId')

    this.loginServis.getPcelar(this.pcelarId).subscribe(
      res => {
        this.pcelar = res
        this.httpClient.get('http://localhost:8080/image/get/' + this.pcelar.profilePicture)
          .subscribe(
            res => {
              this.retrieveResonse = res;
              this.base64Data = this.retrieveResonse.picByte;
              this.profilePicture = 'data:image/jpeg;base64,' + this.base64Data;

            }
          );
      }
    );

  }


  fokus1() {
    if (this.router.url.indexOf('/pcelinjaci') > -1) {
      this.buttonId = 1;
    } else if (this.router.url.indexOf('/planer') > -1) {
      this.buttonId = 2;
    } else if (this.router.url.indexOf('/products') > -1) {
      this.buttonId = 3;
    } else if (this.router.url.indexOf('/profil') > -1) {
      this.buttonId = 4;
    } else if (this.router.url.indexOf('/sales') > -1) {
      this.buttonId = 6;
    } else if (this.router.url.indexOf('/tools') > -1) {
      //skripta
      (function () {
        var qs, j, q, s, d = document, gi = d.getElementById,
          ce = d.createElement, gt = d.getElementsByTagName,
          id = "calconic_", b = "https://cdn.calconic.com/static/js/";
        if (!gi.call(d, id)) {
          j = ce.call(d, "script"); j.id = id; j.type = "text/javascript"; j.async = true;
          j.dataset.calconic = true;
          j.src = b + "calconic.min.js"; q = gt.call(d, "script")[0]; q.parentNode.insertBefore(j, q)
        }
      })();
      this.buttonId = 7;
    }


  }

  fokus(id) {
    this.buttonId = id;
  }

  logout() {
    this.loginServis.logout()
  }

}
