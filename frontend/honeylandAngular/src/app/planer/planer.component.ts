import { Component, OnInit, ViewChild } from '@angular/core';
import { PlanerServisService } from '../servisi/planer-servis.service';
import { extend } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DateTimePicker } from '@syncfusion/ej2-calendars';

import { EventSettingsModel, View, ScheduleComponent, EventRenderedArgs, DataBoundEventArgs } from '@syncfusion/ej2-angular-schedule';
import {
  PopupOpenEventArgs, MonthService, DayService, WeekService, WorkWeekService,  ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';
import { DragEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { ActivatedRoute } from '@angular/router';
import { DogadjajPost, Dogadjaj } from '../data/dogadjaj';
import { BASE_URL } from '../global';
import { Subscription } from '../data/subscription';
import { Pcelar } from '../data/user';
import { PcelarService } from '../servisi/pcelar.service';
import { Pcelinjak } from '../data/pcelinjak';
import { PcelinjakService } from '../servisi/pcelinjak.service';

@Component({
  selector: 'app-planer',
  templateUrl: './planer.component.html',
  styleUrls: ['./planer.component.css']
})
export class PlanerComponent implements OnInit {
  @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;

    pcelarId = 0;
    userId= 0;
    pcelinjaci: Pcelinjak[] = []

    me: Pcelar = new Pcelar()

    subscriptions: Subscription[] = []

    status = ''

    /////
  //  @ViewChild('scheduleObj')
   // public scheduleObj: ScheduleComponent;
   // public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], doctorsEventData, null, true) };
    //public selectedDate: Date = new Date(2018, 1, 15);
    public showQuickInfo: boolean = false; //znaci samo na dupli klik radi
    public categoryFields: Object = { text: 'CategoryText', value: 'CategoryText' };
    public CategoryData: Object[] = [
      { CategoryText: 'Feeding', Id: 1 },
      { CategoryText: 'Inspection', Id: 2 },
      { CategoryText: 'Migration', Id: 3 },
      { CategoryText: 'Treatment', Id: 4 },
      { CategoryText: 'Honey extraction', Id: 5 },
      { CategoryText: 'Pollination', Id: 6 },
      { CategoryText: 'Task', Id: 7 },
      { CategoryText: 'MyEvent', Id: 8 }
    ];

    subData : SubData[]=[]
    public subjectFields: Object = { text: 'SubjectText', value: 'SubjectText' };
    public SubjectData: Object[] ;
    
    // [
    //   { SubjectText: 'Pcelinjak 1', Id: 1 },
    //   { SubjectText: 'Pcelinjak 2', Id: 2 },
    //   // { SubjectText: 'Pcelinjak 3', Id: 3 }
    // ];

    //


  public eventObject: EventSettingsModel = {};

  appointments: Appointment[] = [];
  flag: boolean;
  // StartTime: Date = new Date(Date.now());
  // EndTime: Date = new Date(Date.now());

  constructor(private route: ActivatedRoute,
    private servis: PlanerServisService, private pcelarServus: PcelarService, private pcelinjakServis: PcelinjakService )
     { }

  ngOnInit(): void {
    this.status = ''

    this.userId = +localStorage.getItem('userId')

    this.pcelarServus.getPcelar(+localStorage.getItem('bId')).subscribe(
      res=>{
        this.me = res
      }
    )

    this.flag = false;
    this.pcelarId = +this.route.snapshot.paramMap.get('id');
    this.dohvatiPcelinjake()
    this.getSubscriptions()

    this.eventObject.fields= //na ovaj nacin mozes da izmenis npr nazive polja, kao i defaultne vrednosti3
    { 
          subject: {
            // default: "Dogadjaj", title: "Naziv", 
        //    validation: { required: true }
          },
         // startTime: {title: "Pocetak"},
        //  location: {title: "Lokacija"},
            description: {
              validation: { required: true }
            },
            location: {
              validation: { required: true }
            },
            
            
    }

    


   // this.eventObject.allowDeleting=false;

    this.servis.dohvatiDogadjaje(this.pcelarId).subscribe(
     
      data=>
      {
      
        data.forEach(element => {
          let d = new Appointment();
          d.Id = element.id
          d.Subject = element.naziv
          d.StartTime = new Date(element.datumPocetka)
          d.EndTime = new Date(element.datumKraja)
          if(element.lokacija!=undefined && element.lokacija!=null){
            d.Location = element.lokacija
          }
          if(element.opis!=undefined && element.opis!=null){
            d.Description = element.opis
          }
          if(element.status!=undefined && element.status!=null){
            d.Status = element.status
          }
          
          this.appointments.push(d);
          
        });
        
        this.eventObject.dataSource = this.appointments;
        this.flag=true; //flag za prikaz tj renderovanje
      //  console.log(this.eventObject.dataSource)
      } 
    )

  }

   

  dohvatiPcelinjake(){
    this.pcelinjakServis.dohvatiPcelinjake(this.pcelarId).subscribe(
      data=>{
       // console.log(data)
       // this.pcelinjaci = data;
        let cnt=1
        data.forEach(element => {
          let sd = new SubData()
          sd.SubjectText = element.naziv
          sd.Id =cnt++
          this.subData.push(sd)
        });
        this.SubjectData = this.subData
      }
    )
  }

  getSubscriptions(){
    this.servis.dohvatiSubscribeKorisnike(+localStorage.getItem('bId')).subscribe(
      res=>{
        this.subscriptions =res
        console.log(this.subscriptions)
      }
    )
  }


  // func(){
  //   let event: Object[] = this.scheduleObj.getEvents();
  //   console.log(event.length)
  //   console.log(event[event.length-1])
  //   }

    ///////////////////////////////////////////////////////////////////////

  
   //pretvara datum
    public dateParser(data: string) {
     
        return new Date(data);
      }
      
    public onEventRendered(args: EventRenderedArgs): void {
   
        switch (args.data.Status) {
            case 'Feeding':
                (args.element as HTMLElement).style.backgroundColor = 'rgba(252, 145, 23, 0.8)';   
            //    (args.element as HTMLElement).style.paddingTop = '2px';
           //     (args.element as HTMLElement).style.paddingLeft = '40px';
          //      (args.element as HTMLElement).style.width = '100%';
           //     console.log('Feeding')          
                break;
            case 'Inspection':
                (args.element as HTMLElement).style.backgroundColor = 'rgba(127, 169, 0, 0.8)';
             //   (args.element as HTMLElement).style.paddingTop = '2px';
//(args.element as HTMLElement).style.paddingLeft = '40px';
             //   (args.element as HTMLElement).style.width = '100%';
            //    console.log('Examination')
                break;
            case 'Migration':
                (args.element as HTMLElement).style.backgroundColor = 'rgba(0, 176, 242, 0.8)';
             //   (args.element as HTMLElement).style.paddingTop = '2px';
              //  (args.element as HTMLElement).style.paddingLeft = '40px';
             //   console.log('Migration')
                break;
            case 'Treatment':
               (args.element as HTMLElement).style.backgroundColor = 'rgba(220, 53, 69, 0.8)';
           //    (args.element as HTMLElement).style.paddingTop = '2px';
            //   (args.element as HTMLElement).style.paddingLeft = '40px';
             //  console.log('Medical')
                break;
            case 'Honey extraction':
               (args.element as HTMLElement).style.backgroundColor = 'rgba(255, 204, 0, 0.8)';
           //    (args.element as HTMLElement).style.paddingTop = '2px';
            //   (args.element as HTMLElement).style.paddingLeft = '40px';
             //  console.log('Medical')
                break;
            case 'Task':
               (args.element as HTMLElement).style.opacity = '0.8';
           //    (args.element as HTMLElement).style.paddingTop = '2px';
            //   (args.element as HTMLElement).style.paddingLeft = '40px';
             //  console.log('Medical')
                break;
                case 'MyEvent':
                  (args.element as HTMLElement).style.backgroundColor = 'magenta';
                  (args.element as HTMLElement).style.opacity = '0.7';
           //    (args.element as HTMLElement).style.paddingTop = '2px';
            //   (args.element as HTMLElement).style.paddingLeft = '40px';
             //  console.log('Medical')
                break;
                case 'Pollination':
                  (args.element as HTMLElement).style.backgroundColor = 'pink';
                  (args.element as HTMLElement).style.opacity = '0.9';
           //    (args.element as HTMLElement).style.paddingTop = '2px';
            //   (args.element as HTMLElement).style.paddingLeft = '40px';
             //  console.log('Medical')
                break;
        }
    }

    proba(args: DataBoundEventArgs){
  
    }


    public onActionBegin(args: { [key: string]: Object }): void {
      let dataDel: any = args.data;
        if (args.requestType === 'eventCreate' || args.requestType === 'eventChange' || args.requestType === 'eventRemove' ) {
            let data: any;
            if (args.requestType === 'eventCreate') {
                data = <any>args.data[0];
                console.log(data)
                let dogadjaj: DogadjajPost = new DogadjajPost();
                dogadjaj.naziv = data.Subject;
                dogadjaj.status = data.Status;
                dogadjaj.lokacija = data.Location
                dogadjaj.datumPocetka = data.StartTime
                dogadjaj.datumKraja = data.EndTime
                dogadjaj.opis = data.Description
              
                dogadjaj.pcelar =  `${BASE_URL}/pcelari/${this.pcelarId}`

                //send mail
                if(dogadjaj.status="MyEvent"){
                  console.log("mail")
                  this.subscriptions.forEach(sub => {
                    this.servis.sendMail(sub.user1Id, this.me.ime+ " " +this.me.prezime).subscribe()
                  });
                }
           //  console.log(dogadjaj)
                this.servis.dodajDogadjaj(dogadjaj).subscribe(
                  data=>{
                    //this.ngOnInit()
                  }
                )
            } else if (args.requestType === 'eventChange') {
                data = <any>args.data;
                let dogadjaj: Dogadjaj = new Dogadjaj();
                dogadjaj.id = data.Id
                dogadjaj.naziv = data.Subject;
                dogadjaj.status = data.Status;
                dogadjaj.lokacija = data.Location
                dogadjaj.datumPocetka = data.StartTime
                dogadjaj.datumKraja = data.EndTime
                dogadjaj.opis = data.Description
                this.servis.izmeniDogadjaj(dogadjaj,this.pcelarId).subscribe()
              //   if (!this.scheduleObj.isSlotAvailable(data.StartTime as Date, data.EndTime as Date)) {
              //   args.cancel = true;
              //  }
             //   console.log('izmena')
               // console.log(data)
            }else if (args.requestType === 'eventRemove') {
           //   data = <any>args.data[0];
         //  console.log(dataDel)
              let dogadjajId = dataDel[0].Id
              this.servis.obrisiDogadjaj(dogadjajId).subscribe()
          }


          
        }
    }


}

class Appointment{
  Id: number;
  Subject: string;
  StartTime:  Date;
  EndTime:  Date;
  Location: string = '';
  Description: string = '';
  Status: string = ''
}

class SubData{
  SubjectText;
  Id
}