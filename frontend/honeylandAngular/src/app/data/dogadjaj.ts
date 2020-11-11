import { Pcelar } from './user';

export class Dogadjaj{

    id: number;
    naziv: string;
    datumPocetka: Date;
    datumKraja: Date;
    lokacija: string;
    opis: string;
    status:string;
    pcelar: Pcelar;
}

export class DogadjajPost{

    
    naziv: string;
    datumPocetka: Date;
    datumKraja: Date;
    lokacija: string;
    opis: string;
    status:string;
    pcelar:string;
}