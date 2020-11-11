import { Component, OnInit, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-kosnice',
  templateUrl: './kosnice.component.html',
  styleUrls: ['./kosnice.component.css']
})
export class KosniceComponent implements OnInit {


  gridSirina = 10;
  gridDuzina =  Math.floor(27/10);;
  gridOstatak = 27%10;
  currKosnica = 0;

  constructor() { }

  ngOnInit(): void {
   
  }

  counter(i: number) {
    return new Array(i);
  }    //brojac za for petlju koja mora da prodje kroz brojeve  

  kosnicaEdit(i:number){
    this.currKosnica= i;
  }

}
