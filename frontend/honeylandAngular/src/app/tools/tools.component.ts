import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

  constructor() { }



  ngOnInit(): void {
    //skripta
    // (function() { var qs,j,q,s,d=document, gi=d.getElementById,
    //   ce=d.createElement, gt=d.getElementsByTagName,
    //   id="calconic_", b="https://cdn.calconic.com/static/js/";
    //   if(!gi.call(d,id)) { j=ce.call(d,"script"); j.id=id; j.type="text/javascript"; j.async=true;
    //   j.dataset.calconic=true;
    //   j.src=b+"calconic.min.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(j,q) }
    // })();
  }

}
