import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PcelinjakService } from '../servisi/pcelinjak.service';
import { Pcelinjak, PcelinjakPost } from '../data/pcelinjak';
import { KosniceComponent } from '../kosnice/kosnice.component';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { Kosnica, KosnicaPost } from '../data/kosnice';
import { BASE_URL } from '../global';

@Component({
  selector: 'app-pcelinjaci',
  templateUrl: './pcelinjaci.component.html',
  styleUrls: ['./pcelinjaci.component.css']
})
export class PcelinjaciComponent implements OnInit {

  cnt =2;
  pcelarId: number;
  pcelinjaci: Pcelinjak[] = []

   //paginacija
   thePageNumber: number = 1;
   thePageSize: number = 1;
   theTotalElements: number = 0;

  
  gridSirina = 10;
  gridDuzina =  0;
  gridOstatak = 0;
  currKosnica = -1;
  currEditKosnica: Kosnica = new Kosnica()
  currAddKosnica: KosnicaPost = new KosnicaPost();
  currAddPcelinjak: PcelinjakPost = new PcelinjakPost();
  currEditPcelinjak: Pcelinjak = new Pcelinjak();
  currDeletePcelinjak: Pcelinjak = new Pcelinjak();
  addFlag: boolean = false;

  pcelinjakShow : Pcelinjak = new Pcelinjak()

  currKosniceArr: Kosnica[] = []

  currPcelinjak: number = 0;

  bsModalRef: BsModalRef;

  @ViewChild('childModal', { static: false }) childModal: ModalDirective;
  @ViewChild('editModal', { static: false }) editModal: ModalDirective;
  @ViewChild('deleteModal', { static: false }) deleteModal: ModalDirective;
  @ViewChild('addModal', { static: false }) addModal: ModalDirective;
  
  constructor(private route: ActivatedRoute,
              private servis: PcelinjakService,
              private modalService: BsModalService
              ) { }

  ngOnInit(): void {
    this.pcelarId= +this.route.snapshot.paramMap.get('id');

    this.cnt=2;
    this.dohvatiPcelinjake();
  }


  counter(i: number) {
    return new Array(i);
  }    //brojac za for petlju koja mora da prodje kroz brojeve  

  kosnicaAdd(){
    this.addFlag=true;
  }

  kosnicaEdit(i:number){
    this.addFlag=false;
    this.currKosnica = i;
    this.currEditKosnica = this.currKosniceArr[this.currKosnica];
    
  }

  kosnicaDelete(){
    this.servis.obrisiKosnicu(this.currKosniceArr[this.currKosnica].id).subscribe(
      data=>{
        this.addFlag=false;
        this.currKosnica = -1;
        this.childModal.hide()
        this.ngOnInit()
      }
    )

  }


  showChildModal(pcelinjak: Pcelinjak): void {
  //  this.currBrojKosnica = pcelinjak.brojKosnica;
    this.pcelinjakShow = pcelinjak;
    this.gridDuzina = Math.floor(pcelinjak.brojKosnica/10)
    this.gridOstatak = pcelinjak.brojKosnica%10
  //  console.log(this.gridDuzina, this.gridOstatak)
    this.servis.dohvatiKosnice(pcelinjak.id).subscribe(
      data=>{
        this.currKosniceArr = data;
       // console.log(this.currKosniceArr)
        this.childModal.show();
      }
    )
    
  }
 
  hideChildModal(): void {
    this.addFlag=false;
    this.currKosnica = -1;
    this.childModal.hide();
  }

  showEditModal(p: Pcelinjak){
    this.currEditPcelinjak = p;
    this.editModal.show();
  }

  hideEditModal(){
    this.addFlag=false;
    this.currKosnica = -1;
    this.editModal.hide();
  }

  saveEditedPcelinjak(){
    this.servis.izmeniPcelinjak(this.currEditPcelinjak, this.pcelarId).subscribe(
      data=>{
        this.addFlag=false;
        this.currKosnica = -1;
        this.editModal.hide()
      }
    )
  }

  showDodajPcelinjakModal(){

    this.addModal.show()

  }

  hideDodajPcelinjakModal(){

    this.addModal.hide()

  }

  dodajPcelinjak(){
    this.currAddPcelinjak.pcelar = `${BASE_URL}/pcelari/${this.pcelarId}`
    this.servis.dodajPcelinjak(this.currAddPcelinjak).subscribe(
      data=>{
        this.addModal.hide();
        this.ngOnInit();
      }
    )
  }

  showDeleteModal(p: Pcelinjak){
    this.currDeletePcelinjak = p;
    this.deleteModal.show();
  }

  hideDeleteModal(){
    this.addFlag=false;
    this.currKosnica = -1;
    this.deleteModal.hide();
  }

  deletePcelinjak(){
    this.servis.obrisiPcelinjak(this.currDeletePcelinjak.id).subscribe(
      data=>{
        this.addFlag=false;
        this.currKosnica = -1;
        this.deleteModal.hide();
        this.ngOnInit();
      }
    )


  }

 

  dohvatiPcelinjake(){
    this.servis.dohvatiPcelinjakePaginacija(this.thePageNumber - 1, this.thePageSize,this.pcelarId).subscribe(
      data=>{
       // console.log(data)
        this.pcelinjaci = data._embedded.pcelinjaci;
        this.gridDuzina = Math.floor(this.pcelinjaci[0].brojKosnica/10);
        this.gridOstatak = this.pcelinjaci[0].brojKosnica%10;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
       // console.log(this.pcelinjaci)
      }
    )
  }

  save(){
    if(!this.addFlag){ //izmena kosnice
      this.servis.izmeniKosnicu(this.currEditKosnica.id, this.pcelinjakShow.id ,this.currEditKosnica.rbr, this.currEditKosnica.vrsta, this.currEditKosnica.velicinaHranilice, this.currEditKosnica.starostMatice, this.currEditKosnica.velicinaLegla, this.currEditKosnica.opsteStanje, this.currEditKosnica.temperatura).subscribe(
      data=>{
        this.currKosnica = -1;
        this.childModal.hide();
      }
    )
    }else{ //dodavanje kosnice
      this.currAddKosnica.pcelinjak = `${BASE_URL}/pcelinjaci/${this.pcelinjakShow.id}`
    //  console.log(this.currAddKosnica)
      this.servis.dodajKosnicu(this.currAddKosnica).subscribe(
        data=>{
          this.addFlag=false;
          this.currKosnica = -1;
          this.childModal.hide();
          this.ngOnInit();
        //  this.servis.updateKosnicaPcelinjak( data.id,this.currEditPcelinjak.id).subscribe()
        }
      )
    }
    
  }

 
  

}
