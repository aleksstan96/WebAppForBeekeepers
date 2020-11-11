import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Proizvod } from '../data/proizvod';
import { Pcelar, User } from '../data/user';
import { LoginService } from '../servisi/login.service';
import { PcelarService } from '../servisi/pcelar.service';
import { PlanerServisService } from '../servisi/planer-servis.service';

@Component({
  selector: 'app-pcelar-detalji',
  templateUrl: './pcelar-detalji.component.html',
  styleUrls: ['./pcelar-detalji.component.css']
})
export class PcelarDetaljiComponent implements OnInit {

  @ViewChild('editModal', { static: false }) editModal: ModalDirective;
  @ViewChild('editPictureModal', { static: false }) editPictureModal: ModalDirective;
  @ViewChild('addPictureModal', { static: false }) addPictureModal: ModalDirective;
  
  pcelarId;
  pcelar: Pcelar = new Pcelar()
  userId;
  user: User = new User()
  usernamePostoji = false
  passwordReplica = ""
  message = ""
  razliciteLozinke: boolean = false;
  regex = new RegExp("(^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,})");
  clicked: boolean = false;
  myUsername: string;
  galleryImages: string[] = []
  galleryImagesShow: any[] = []
  galleryImage: any

  profilePicture: any;
  profilePictureName: string;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  base64Data1: any;
  retrieveResonse1: any;

  //za galeriju
  imageShowName: string = ''
  imageShow: any;

  //role
  role: string
  bId: number = 0;
  cId: number= 0;

  following: number[]=[]

  myCart: Proizvod[] = []

  constructor(private route: ActivatedRoute,
    private servis: PcelarService,private planerServis: PlanerServisService, 
    private loginServis: LoginService,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role')
    if(this.role=='b'){
      this.bId = +localStorage.getItem('bId')
    }else if(this.role=='c'){
      this.cId = +localStorage.getItem('cId')
    } 
    this.galleryImages = []
    this.galleryImagesShow = []
    this.clicked = false
   
    this.myCart = JSON.parse(localStorage.getItem('myCart'))
    this.userId = +localStorage.getItem('userId')
    this.pcelarId = +this.route.snapshot.paramMap.get('id');
    this.getPcelareSubscribed()
    this.loginServis.findUser(this.userId).subscribe(
      res => {
        this.user = res
        this.myUsername = res.username
        this.passwordReplica = res.password
      }
    )
    this.loginServis.getPcelar(this.pcelarId).subscribe(
      res => {
        this.pcelar = res

        this.galleryImages= this.pcelar.slike.split(",")
        this.galleryImages.forEach(element => {
         
          this.httpClient.get('http://localhost:8080/image/get/' + element)
          .subscribe(
            res => {
              this.retrieveResonse1 = res;
              this.base64Data1 = this.retrieveResonse1.picByte;
              this.galleryImage = 'data:image/jpeg;base64,' + this.base64Data1;
              this.galleryImagesShow.push(this.galleryImage);
             
            }
          );
        });

        this.httpClient.get('http://localhost:8080/image/get/' + this.pcelar.profilePicture)
          .subscribe(
            res => {
              this.retrieveResonse = res;
              this.base64Data = this.retrieveResonse.picByte;
              this.profilePicture = 'data:image/jpeg;base64,' + this.base64Data;

            }
          );
        //  console.log(this.pcelar)
      }
    )
  }

  isMe(id):boolean{
    return id==this.bId
  }

  subscribe(){

    this.planerServis.subscribe(this.userId, this.pcelar.id).subscribe(
      res=>{
       
        this.getPcelareSubscribed()
      }
    )

  }

  unsubscribe(){
    
    this.planerServis.getSubscription(this.userId, this.pcelar.id).subscribe(
      res=>{
        this.planerServis.unsubscribe(res[0].id).subscribe(
          res=>{
            this.getPcelareSubscribed()
          }
        )
      }
    )
    
  }


  
  logout(){
    this.loginServis.logout()
  }

  getPcelareSubscribed(){
    this.following = []
    this.planerServis.dohvatiPcelareSubscribe(this.userId).subscribe(
      res=>{
        res.forEach(element => {
          this.following.push(element.user2Id)
        });
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



}
