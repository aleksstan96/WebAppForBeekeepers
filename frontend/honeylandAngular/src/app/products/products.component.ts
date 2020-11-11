import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Proizvod, ProizvodPost } from '../data/proizvod';
import { BASE_URL } from '../global';
import { ProizvodiService } from '../servisi/proizvodi.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @ViewChild('editModal', { static: false }) editModal: ModalDirective;
  @ViewChild('deleteModal', { static: false }) deleteModal: ModalDirective;
  @ViewChild('addModal', { static: false }) addModal: ModalDirective;

  constructor(private route: ActivatedRoute,
    private servis: ProizvodiService, private httpClient: HttpClient) { }

  pcelarId: number;
  proizvodi: Proizvod[] = []

  currAddProizvod: ProizvodPost = new ProizvodPost();
  currEditProizvod: Proizvod = new Proizvod();
  currDeleteProizvod: Proizvod = new Proizvod();

  selectedFile: File;
  retrievedImage: any;
  imageShowName: string = ''
  imageShow: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

  //paginacija
  thePageNumber: number = 1;
  thePageSize: number = 3;
  theTotalElements: number = 0;

  ngOnInit() {
    this.retrievedImage = {}
    this.pcelarId = +this.route.snapshot.paramMap.get('id');
    this.getAllProducts();
  }


  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
    this.imageShowName=  this.selectedFile.name;
    //prikaz slike
    const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);

      reader.onload = event => {
        this.imageShow = reader.result;
      };

  }
  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    //console.log(this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );
  }
  //Gets called when the user clicks on retieve image button to get the image from back end
  getImage(imageNamw) {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/image/get/' + imageNamw)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
           this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          return this.retrievedImage
        }
      );
  }

  //Gets called when the user clicks on retieve image button to get the image from back end
  getImageById(id) {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/image/getById/' + id)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

  getAllProducts() {
    this.servis.dohvatiProizvodePaginacija(this.thePageNumber - 1, this.thePageSize).subscribe(
      res => {
        this.proizvodi = res._embedded.proizvodi;
        this.proizvodi.forEach(p => {
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


  dohvatiProizvode() {

    let cnt=0
    this.servis.dohvatiProizvode(this.pcelarId).subscribe(
      data => {
        this.proizvodi = data;
        this.proizvodi.forEach(p => {
          //dohvatanje slike
          this.httpClient.get('http://localhost:8080/image/get/' + p.slika)
            .subscribe(
              res => {
                //dohvatanje slike
                this.retrieveResonse = res;
                this.base64Data = this.retrieveResonse.picByte;
                this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
                p.slikaShow = this.retrievedImage
                cnt++
         
                
              }
            );

        });


      }
    )
  }

  showEditModal(p: Proizvod) {
    this.currEditProizvod = p;
    this.imageShow=p.slikaShow
    this.imageShowName = p.slika
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/image/get/' + this.currEditProizvod.slika)
      .subscribe(
        res => {
          //dohvatanje slike
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;

          //show modal
          this.editModal.show()

        }
      );



  }

  hideEditModal() {
       this.editModal.hide()
  }

  saveEditedProizvod() {
    this.currEditProizvod.slika = this.imageShowName
    this.servis.izmeniProizvod(this.currEditProizvod, this.pcelarId).subscribe(
      result=>{
        this.httpClient.get('http://localhost:8080/image/get/' + this.currEditProizvod.slika)
        .subscribe(
          res => {
            //console.log(res)
            this.editModal.hide()
            this.ngOnInit()
          },
          error=>{
          //  console.log('greska' + error)
            this.onUpload() //ako ne postoji slika pod ovim imenom, cuvamo je
            this.ngOnInit()
            this.editModal.hide()
          }

        );
      }
    )

    //sliku u tabeli Proizvod cuvaj po nazivu
    //kada neko odradi upload, proveri da li u tabeli image_table postoji slika pod tim nazivom,
    //ako postoji ne radi nista a ako ne onda sacuvaj u bazu
    //prikazzaces je tako sto ces je naci po imenu

  }

 //delete

  showDeleteModal(p: Proizvod) {
    this.currDeleteProizvod = p;
    this.deleteModal.show()

  }

  hideDeleteModal() { 
    this.deleteModal.hide()
  }

  deleteProizvod() {
    this.servis.obrisiProizvod(this.currDeleteProizvod.id).subscribe(
      res=>{
        this.ngOnInit()
        this.hideDeleteModal()
      }
    )
  }

  //add 

  showDodajProizvodModal() {
    this.imageShow = '/../assets/images/logo.png'
    this.addModal.show()

  }

  hideDodajProizvodModal() {

    this.addModal.hide()

  }

  dodajProizvod() {
    
    if(this.imageShow=='/../assets/images/logo.png'){
      this.currAddProizvod.slika = "logo.png"
    }else{
        this.currAddProizvod.slika= this.imageShowName
    }
    
    this.currAddProizvod.pcelar = `${BASE_URL}/pcelari/${this.pcelarId}`
    this.currAddProizvod.ocena=0
    this.currAddProizvod.brOcena=0
    this.servis.dodajProizvod(this.currAddProizvod).subscribe(
      data=>{
        this.httpClient.get('http://localhost:8080/image/get/' + this.currAddProizvod.slika)
        .subscribe(
          res => {
            //console.log(res)
            this.addModal.hide()
            this.ngOnInit()
          },
          error=>{
          //  console.log('greska' + error)
            this.onUpload() //ako ne postoji slika pod ovim imenom, cuvamo je
            this.ngOnInit()
            this.addModal.hide()
          }

        );
      }
    )


  }
  

  counter(i: number) {
    return new Array(i);
  }



}
