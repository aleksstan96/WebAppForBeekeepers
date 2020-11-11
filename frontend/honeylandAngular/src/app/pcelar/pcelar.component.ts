import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pcelar',
  templateUrl: './pcelar.component.html',
  styleUrls: ['./pcelar.component.css']
})
export class PcelarComponent implements OnInit {
   buttonId = 1 //sluzi da znamo koje je trenutno dugme na side meniju obelezeno

  pcelarId: number;
 
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pcelarId= +this.route.snapshot.paramMap.get('id');
   // console.log(this.pcelarId)

  }

  fokus(id){
   this.buttonId=id
    

  }

  logout(){
    
  }

}
