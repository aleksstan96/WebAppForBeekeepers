import { Component } from '@angular/core';

import { EventSettingsModel, View } from '@syncfusion/ej2-angular-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { ServisService } from './servis.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-scheduler-app';

  public setView: View='Month';
  public setDate: Date = new Date(2017,5,5)

  constructor(private servis: ServisService) { 


  }

  public eventData: DataManager = new DataManager({ //define DataManager 
    url: "http://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData", //udaljeni api na koji ovako automatski saljemmo get zahtev
    adaptor: new WebApiAdaptor,
    crossDomain: true
  })

  // public eventObject: EventSettingsModel = {
  //   dataSource:
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
  // this.eventData
  // }

  

}
