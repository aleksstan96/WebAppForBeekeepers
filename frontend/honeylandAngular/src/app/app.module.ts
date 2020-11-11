import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PcelarComponent } from './pcelar/pcelar.component';
import { LoginComponent } from './login/login.component';
import { PcelinjaciComponent } from './pcelinjaci/pcelinjaci.component';
import { PlanerComponent } from './planer/planer.component';

// import the ScheduleModule for the Schedule component
import { ScheduleModule,  DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService, ResizeService, DragAndDropService } from '@syncfusion/ej2-angular-schedule';
import {DropDownListModule} from '@syncfusion/ej2-angular-dropdowns';
import {DateTimePickerModule} from '@syncfusion/ej2-angular-calendars';

import { ModalModule } from 'ngx-bootstrap/modal';

import { RecaptchaModule } from 'ng-recaptcha';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { ChartsModule } from 'ng2-charts'; 

import { WeatherComponent } from './weather/weather.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './footer/footer.component';
import { KosniceComponent } from './kosnice/kosnice.component';
import { KupacComponent } from './kupac/kupac.component';
import { AdminComponent } from './admin/admin.component';
import { Pcelar1Component } from './pcelar1/pcelar1.component';
import { Shop1Component } from './shop1/shop1.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProizvodDetaljiComponent } from './proizvod-detalji/proizvod-detalji.component';
import { ToolsComponent } from './tools/tools.component';
import { CartComponent } from './cart/cart.component';
import { PcelarDetaljiComponent } from './pcelar-detalji/pcelar-detalji.component';
import { SalesComponent } from './sales/sales.component';
import { HistoryComponent } from './history/history.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    PcelarComponent,
    LoginComponent,
    PcelinjaciComponent,
    PlanerComponent,
    WeatherComponent,
    ProductsComponent,
    ProfileComponent,
    FooterComponent,
    KosniceComponent,
    KupacComponent,
    AdminComponent,
    Pcelar1Component,
    Shop1Component,
    ProizvodDetaljiComponent,
    ToolsComponent,
    CartComponent,
    PcelarDetaljiComponent,
    SalesComponent,
    HistoryComponent,
    ErrorComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ScheduleModule,
    FormsModule,
    HttpClientModule,
    DropDownListModule,
    DateTimePickerModule,
    ModalModule.forRoot(),
    RecaptchaModule,
    MDBBootstrapModule.forRoot(),
    NgbModule,
    ChartsModule 
  
  ],
  providers: [DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService,ResizeService, DragAndDropService ],
 
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
