import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WOW } from 'wowjs/dist/wow.min';
import { Proizvod } from '../data/proizvod';
import { Pcelar } from '../data/user';
import { LoginService } from '../servisi/login.service';
import { ProizvodiService } from '../servisi/proizvodi.service';

@Component({
  selector: 'app-shop1',
  templateUrl: './shop1.component.html',
  styleUrls: ['./shop1.component.css']
})
export class Shop1Component implements OnInit, AfterViewInit {


  ngAfterViewInit() {
    new WOW().init();
  }

  myCart: Proizvod[] = []

  //paginacija
  thePageNumber: number = 1;
  thePageSize: number = 8;
  theTotalElements: number = 0;

  products: Proizvod[] = []


  //slike
  selectedFile: File;
  retrievedImage: any;
  imageShowName: string = ''
  imageShow: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  messageId =0
  imageName: any;


  //kategorija
  currCategory = 'All'

  //search
  searchName = ''

  //role
  role: string

  constructor(private service: ProizvodiService, private loginService: LoginService,
    private router: Router,
    private httpClient: HttpClient,) { }

  ngOnInit(): void {
    this.myCart = JSON.parse(localStorage.getItem('myCart'))
    this.role = localStorage.getItem('role')
    this.getAllProducts()
  }

  redirect(i) {
    this.router.navigateByUrl(`${i}/product`)
  }

  counter(i: number) {
    return new Array(i);
  }    //brojac za for petlju koja mora da prodje kroz brojeve  

  setCategory(c: string) {
    this.currCategory = c;
    this.getProductsByCategory()
  }

  getProductsByName(name: string) {
    this.service.dohvatiProizvodePoNazivu(this.thePageNumber - 1, this.thePageSize, name).subscribe(
      res => {
        this.products = res._embedded.proizvodi;
        this.products.forEach(p => {
          //dohvatanje pcelara
          this.httpClient.get<Pcelar>(`http://localhost:8080/proizvodi/${p.id}/pcelar`).subscribe(
            res=>{
              p.pcelar = res
            }
          )
          //dohvatanje slike
          this.httpClient.get('http://localhost:8080/image/get/' + p.slika)
            .subscribe(
              res => {
                //dohvatanje slike
                this.retrieveResonse = res;
                this.base64Data = this.retrieveResonse.picByte;
                this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
                p.slikaShow = this.retrievedImage


              }
            );
          this.thePageNumber = res.page.number + 1;
          this.thePageSize = res.page.size;
          this.theTotalElements = res.page.totalElements;
        }
        )
        this.thePageNumber = res.page.number + 1;
        this.thePageSize = res.page.size;
        this.theTotalElements = res.page.totalElements;
      }
    )
  }

  getAllProducts() {
    this.service.dohvatiProizvodePaginacija(this.thePageNumber - 1, this.thePageSize).subscribe(
      res => {
        this.products = res._embedded.proizvodi;
        this.products.forEach(p => {
          //dohvatanje pcelara
          this.httpClient.get<Pcelar>(`http://localhost:8080/proizvodi/${p.id}/pcelar`).subscribe(
            res=>{
              p.pcelar = res
            }
          )
          //dohvatanje slike
          this.httpClient.get('http://localhost:8080/image/get/' + p.slika)
            .subscribe(
              res => {
                //dohvatanje slike
                this.retrieveResonse = res;
                this.base64Data = this.retrieveResonse.picByte;
                this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
                p.slikaShow = this.retrievedImage


              }
            );
          this.thePageNumber = res.page.number + 1;
          this.thePageSize = res.page.size;
          this.theTotalElements = res.page.totalElements;
        }
        )
      }
    )
  }

  getProductsByCategory() {
    if (this.currCategory == 'All') {
      this.getAllProducts();
    } else {
      this.service.dohvatiProizvodePaginacijaKategorija(this.thePageNumber - 1, this.thePageSize, this.currCategory).subscribe(
        res => {
          this.products = res._embedded.proizvodi;
          this.products.forEach(p => {
            //dohvatanje pcelara
            this.httpClient.get<Pcelar>(`http://localhost:8080/proizvodi/${p.id}/pcelar`).subscribe(
            res=>{
              p.pcelar = res
            }
          )
            //dohvatanje slike
            this.httpClient.get('http://localhost:8080/image/get/' + p.slika)
              .subscribe(
                res => {
                  //dohvatanje slike
                  this.retrieveResonse = res;
                  this.base64Data = this.retrieveResonse.picByte;
                  this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
                  p.slikaShow = this.retrievedImage


                }
              );
            this.thePageNumber = res.page.number + 1;
            this.thePageSize = res.page.size;
            this.theTotalElements = res.page.totalElements;
          }
          )
          this.thePageNumber = res.page.number + 1;
          this.thePageSize = res.page.size;
          this.theTotalElements = res.page.totalElements;
        }
      )

    }

  }

  logout(){
    this.loginService.logout()
  }


  addToCart(product: Proizvod, kolicina, ukupno) {
    this.message = ''
    if (kolicina > ukupno) {
      this.message = "Not enough products available"
      this.messageId = product.id
    }else if(kolicina<0){
      this.message = "Quantity must be greater than 0"
      this.messageId = product.id
    }
     else {
      this.myCart = JSON.parse(localStorage.getItem('myCart'))
      // product.kolicina=kolicina
      let p = new Proizvod()
      p.id = product.id
      p.naziv = product.naziv
      p.kategorija = product.kategorija
      p.brOcena = product.brOcena
      p.cena = product.cena
      p.slika = product.slika
      p.slikaShow = product.slikaShow
      p.kolicina =kolicina
      this.myCart.push(p)
      localStorage.setItem('myCart', JSON.stringify(this.myCart))
    }

  }

}

