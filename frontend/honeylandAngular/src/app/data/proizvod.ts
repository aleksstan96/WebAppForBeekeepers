import { Pcelar } from './user';

export class Proizvod {
    id: number;

    info: string;

    naziv: string;

    cena: number;

    kolicina: number;

    slika: string;

    kategorija: string;

    slikaShow: any;

    ocena: number;

    brOcena: number;

    pcelar: Pcelar;
}

export class ProizvodPost {
    pcelar: string;

    info: string;

    naziv: string;

    cena: number;

    kolicina: number;

    slika: string;

    kategorija: string;

    ocena: number;

    brOcena: number;
}

export class Porudzbina{
    id:number
    proizvodId: number;
    userId: number;
    kolicina: number;
    datum: Date
    prizvod: Proizvod
}