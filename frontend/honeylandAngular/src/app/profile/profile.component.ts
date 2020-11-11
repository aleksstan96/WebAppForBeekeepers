import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Pcelar, User } from '../data/user';
import { LoginService } from '../servisi/login.service';
import { PcelarService } from '../servisi/pcelar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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



  constructor(private route: ActivatedRoute,
    private servis: PcelarService,
    private loginServis: LoginService,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.galleryImages = []
    this.galleryImagesShow = []
    this.clicked = false


    this.userId = +localStorage.getItem('userId')
    this.pcelarId = +this.route.snapshot.paramMap.get('id');
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

  toStr(i): string{
    return i.toString()
  }

  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
    this.profilePictureName = this.selectedFile.name;
    console.log(this.profilePictureName)
    //prikaz slike
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);

    reader.onload = event => {
      this.profilePicture = reader.result;
    };

  }

//Gets called when the user selects an image
public onFileChanged1(event) {
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


  showEditModal() {
    this.clicked = false
    this.editModal.show()
  }

  hideEditModal() {
    this.clicked = false
    this.ngOnInit()
    this.editModal.hide()
  }

  save(passRegex) {

    this.clicked = true

    if (this.user.password != this.passwordReplica) {
      this.razliciteLozinke = true;
    } else if (!passRegex) {
      if (this.myUsername != this.user.username) {  //ako je promenjeno korisnicko ime
        this.loginServis.findUserByUsername(this.user.username).subscribe(
          data => {
            if (data.length == 0) { //ne postoji kosrisnik sa istim usernameom
              //izmena usera
              this.loginServis.updateUser(this.user).subscribe()
              //izmena pcelara
              this.servis.updatePcelar(this.pcelar).subscribe(
                res => {
                  this.ngOnInit()
                  this.editModal.hide()
                },
                error => {
                  this.ngOnInit()
                  this.editModal.hide()
                }
              )

            } else {
              this.usernamePostoji = true;

            }
          }
        )
      }else{ //korisnicko ime nije promenjeno
        this.loginServis.updateUser(this.user).subscribe()
        this.servis.updatePcelar(this.pcelar).subscribe(
          res => {
            this.ngOnInit()
            this.hideEditModal()
          },
          error => {
            this.ngOnInit()
            this.hideEditModal()
          }
        )
      }




    }


  }

  showEditPictureModal() {
    this.editPictureModal.show()
  }

  hideEditPictureModal() {
    this.ngOnInit()
    this.editPictureModal.hide()
  }

  editProfilePicture() {

    //cuvanje slike u bazi
    this.httpClient.get('http://localhost:8080/image/get/' + this.profilePictureName)
      .subscribe(
        res => {
          //console.log(res)
          
          this.ngOnInit()
          this.hideAddPictureModal()
        },
        error => {
          //  console.log('greska' + error)
          
          this.onUpload() //ako ne postoji slika pod ovim imenom, cuvamo je
          this.hideAddPictureModal()
        }

      );

    //izmena pcelara
    console.log(this.profilePictureName)
    this.servis.updatePcelarProfileImage(this.pcelarId, this.profilePictureName).subscribe()

  }


  showAddPictureModal() {
    this.imageShow = '/../assets/images/upload.png'
    this.addPictureModal.show()

  }

  hideAddPictureModal() {

    this.addPictureModal.hide()

  }

  addPicture() {

    let slike= this.pcelar.slike + ',' + this.imageShowName;
   
    this.servis.updatePcelarGallery(this.pcelar.id, slike).subscribe(
      data=>{
        this.httpClient.get('http://localhost:8080/image/get/' + this.imageShowName)
        .subscribe(
          res => {
            //console.log(res)
           
            this.addPictureModal.hide()
            this.ngOnInit()
          },
          error=>{
          //  console.log('greska' + error)
            this.onUpload() //ako ne postoji slika pod ovim imenom, cuvamo je
           
            this.addPictureModal.hide()
            this.ngOnInit()
          }

        );
      }
    )


  }

}
