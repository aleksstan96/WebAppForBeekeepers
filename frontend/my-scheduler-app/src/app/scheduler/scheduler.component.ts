import { Component, OnInit } from '@angular/core';
import { EventSettingsModel, View } from '@syncfusion/ej2-angular-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { ServisService } from '../servis.service';
import { Dogadjaj } from '../event';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

  constructor(private servis: ServisService) { }

  dogadjaji: Dogadjaj[] = [];
  dog: Dog[]=[];
  flag: boolean = false;

  ngOnInit(): void {
    this.eventObject.fields=
    { //na ovaj nacin mozes da izmenis npr nazive polja, kao i defaultne vrednosti3
          subject: {default: "Dogadjaj", title: "Naziv", validation: { required: true }},
          startTime: {title: "Pocetak"},
          location: {title: "Lokacija"}
        }
    this.servis.dohvatiDogadjaje().subscribe(
     
      data=>
      {
       
        this.dogadjaji=data;
        this.dogadjaji.forEach(element => {
          let d = new Dog();
          d.Subject = element.naziv
          d.StartTime = new Date(element.datumPocetka)
          d.EndTime = new Date(element.datumKraja)
          d.Location = element.lokacija
          this.dog.push(d);
          
        });
        this.eventObject.dataSource = this.dog;
        this.flag=true;
        console.log(this.eventObject.dataSource)
      } 
    )
  }

  public eventObject: EventSettingsModel = {};
  //  = {
  //   dataSource: 
  // //  [
  //   //   {
  //   //     StartTime:  new Date(2020,8,7,4,0),
  //   //     EndTime:   new Date(2020,8,7,6,0),
  //   //     Subject: 'Test',
  //   // //    Location: 'Uzice, Srbija'
  //   //   }
     
  // //  ]
  //    this.dogadjaji
  //   // [{
  // //     StartTime: new Date(2020,8,7,4,0),
  // //     EndTime: new Date(2020,8,7,6,0),
  // //     Subject: 'Test',
  // //    // IsAllDay: true
  // //    // RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=10' //ponavlja se dnevno 10 puta
  // //   // IsReadonly: true,
  // //  //  IsBlock: true,
  // //   }],
  // //   fields:{ //na ovaj nacin mozes da izmenis npr nazive polja, kao i defaultne vrednosti3
  // //     subject: {default: "Dogadjaj", title: "Naziv"},
  // //     startTime: {title: "Pocetak"},
  // //     location: {title: "Lokacija"}
  // //   }

  // //assign DataManager instance to dataSource of Scheduler: ako zelimo sa udaljenog apija da procitamo evente
  
  // }

  sacuvaj(){
    console.log(this.eventObject.dataSource);
  }

}


export class Dog{
    
  Subject: string;
  StartTime:  Date;
  EndTime:  Date;
  Location: string;
}