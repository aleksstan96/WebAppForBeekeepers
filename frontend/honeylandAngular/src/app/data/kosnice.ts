export class Kosnica{

    id : number;
    rbr : number;
    vrsta : string;
    velicinaHranilice : number;
    velicinaLegla : number;
    temperatura : number;
    opsteStanje : string = "ok";
    starostMatice : number;
}


export class KosnicaPost{
    rbr : number;
    vrsta : string;
    velicinaHranilice : number;
    velicinaLegla : number;
    temperatura : number;
    opsteStanje : string = "ok";
    starostMatice : number;
    pcelinjak:string= ""
  }