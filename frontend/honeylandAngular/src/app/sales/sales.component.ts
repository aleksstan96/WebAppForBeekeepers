import { Component, OnInit } from '@angular/core';
import { Porudzbina } from '../data/proizvod';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { PorudzbinaService } from '../servisi/porudzbina.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  porudzbine: Porudzbina[] = [];
  pcelarId: number = 0;
  datumi:string[]=[]
  brPorudzbina: number[] = []

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = this.datumi;
  //['1', '2', '3', '4', '5', '6','7', '8', '9', '10', '11', '12','13', '14', '15', '16', '17', '18','19', '20', '21', '22', '23', '24','25', '26', '27', '28', '29', '30'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: this.brPorudzbina, label: 'Orders per day' }
  ];



  constructor(private porudzbinaServis: PorudzbinaService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.pcelarId = +this.route.snapshot.paramMap.get('id')

     let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    let endDate = new Date(); 
  //  console.log(startDate.getMonth())
   // console.log(endDate.getMonth())
    //funkcija getMonth() vraca mesece od 0 do 11!!!
    
    
        this.porudzbinaServis.dohvatiPorudzbineUProteklihMesecDana(this.pcelarId, startDate,endDate).subscribe(
          data=>{
            //console.log(data) for(let temp of data){
              // if(temp.status!="otkazana"){
              //   this.porudzbine.push(temp)
              // }  
            this.porudzbine=data          
    
           // console.log(this.porudzbine)

            let datum = startDate;
            for(let i=0; i<30; i++){
              this.brPorudzbina.push(0);
              datum.setDate(datum.getDate()+1);
            //  console.log(datum);
              for(let temp of this.porudzbine){
                let datumP = new Date(temp.datum)
                let danPor = datumP.getDate();
                let mesecPor =datumP.getMonth();
                let godinaPor = datumP.getFullYear();
                if(danPor==datum.getDate() && mesecPor==datum.getMonth() && godinaPor==datum.getFullYear()){
              //    console.log(danPor)
                  this.brPorudzbina[this.brPorudzbina.length-1]++;
                }
              }
           //  console.log(this.brPorudzbina)
              let d = new Date(datum)
              this.datumi.push(d.toDateString())
            }
          //  console.log(this.brPorudzbina)

          }
        )

  }


}

class DanMesec{
  dan:number;
  mesec:string;
}