import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User, Pcelar, UserRequest } from '../data/user';
import { LoginService } from '../servisi/login.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Proizvod } from '../data/proizvod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('registerModal', { static: false }) registerModal: ModalDirective;

  user: User = new User();
  regUser: UserRequest = new UserRequest();; //moze bilo koji tip jer su isti i pcelar i kupac i admin
  passwordReplica = ""
  message = ""
  razliciteLozinke: boolean = false;
  regex = new RegExp("(^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,})");
  clicked: boolean = false;
  clicked1 = false
  usernamePostoji: boolean = false;
  captcha: boolean = false;
  korisnikNijePronadjen = false;


  constructor(private router: Router,
    private servis: LoginService) { }

  save(ime, prezime, username, lozinka, duplikat, datum, mesto, telefon, email, regex) {
    this.clicked = true;
   this.razliciteLozinke=false;
   this.usernamePostoji=false;
    if (this.captcha) {
    
      this.checkDataAndSave(ime, prezime, username, lozinka, duplikat, datum, mesto, telefon, email, regex);
    }
  }

  private checkDataAndSave(ime: any, prezime: any, username: any, lozinka: any, duplikat: any, datum: any, mesto: any, telefon: any, email: any, regex: any) {
    
    if (!ime && !prezime && !username && !lozinka && !duplikat && !datum && !mesto && !telefon && !email && !regex) {
      console.log('checkAndSave')
      if (this.regUser.password != this.passwordReplica) {
        console.log('razlicite')
        this.razliciteLozinke = true;
        //   this.clicked=false;
      }
      else {
        this.servis.findUserByUsername(this.regUser.username).subscribe(
          data => {
            if (data.length == 0) { //ne postoji kosrisnik sa istim usernameom
              //  console.log(data.length)
              //slanje zahteva
              this.servis.posaljiRegZahtev(this.regUser).subscribe();
              this.registerModal.hide()
            } else {
              console.log("postoji")
              this.usernamePostoji = true;
              //  this.clicked=false;
            }
          }
        )

      }
    }
  }


  public resolved(captchaResponse: string) {
    // console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.captcha = true;
  }



  ngOnInit(): void {
    this.regUser = new UserRequest()
    let role = localStorage.getItem('role');
   // console.log(role)
    if (role != null) {
      switch (role) {
        case 'a':
          this.router.navigateByUrl(`admin`)
          break;
        case 'b':
          this.router.navigateByUrl(`pcelar`)
          break;
        case 'c':
          this.router.navigateByUrl(`kupac`)
          break;
        default:
          break;
      }
    }
    this.razliciteLozinke = false;
    this.clicked = false;
    this.clicked1 = false;
    this.usernamePostoji = false;
    this.korisnikNijePronadjen = false
    this.user.username = ''
    this.user.password = ''
  }



  showRegisterModal() {
    this.registerModal.show()
  }

  hideRegisterModal() {
    this.ngOnInit()
    this.registerModal.hide()
  }


  login() {
    //console.log(this.user)
    //this.router.navigateByUrl('pcelar/1/pcelinjaci')
    this.clicked1 = true
    if (this.user.username != '' && this.user.password != '') {
      this.servis.login(this.user.username, this.user.password).subscribe(
        data => {
          if (data.length == 0) { //user not found

            this.korisnikNijePronadjen = true
          } else {
            if (data[0].role == 'Beekeeper') {
              localStorage.setItem('role', 'b')
              localStorage.setItem('userId', data[0].id.toString())
              this.servis.findPcelarByUserId(data[0].id).subscribe(
                data => {
                  localStorage.setItem('bId', data.id.toString())
                  this.router.navigateByUrl(`pcelar/${data.id}/pcelinjaci`)
                }
              )

            } else if (data[0].role == 'Customer') {
              localStorage.setItem('role', 'c')
              localStorage.setItem('userId', data[0].id.toString())
              this.servis.findKupacByUserId(data[0].id).subscribe(
                data => {
                  localStorage.setItem('cId', data.id.toString())
                  let myCart: Proizvod[] = []
                  localStorage.setItem('myCart', JSON.stringify(myCart))
                  this.router.navigateByUrl(`kupac`)
                }
              )

            } else if (data[0].role == 'Admin') {
              localStorage.setItem('role', 'a')
              localStorage.setItem('userId', data[0].id.toString())
              this.router.navigateByUrl(`admin`)
            }
          }
        }
      )
    }

  }



}
