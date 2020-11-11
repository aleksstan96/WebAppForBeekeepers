export class User{
	id: number;
    username: string;
    password: string;
    role: string;

}

export class Pcelar{

    id :number;
	
    ime: string;
	
	prezime: string;
	
	datumRodjenja: Date;
	
	adresa: string;
	
	telefon: string;
	
	email: string;

	aboutMe: string;

	slike: string;

	profilePicture: string;

}

export class Kupac{

    id :number;
	
    ime: string;
	
	prezime: string;
	
	datumRodjenja: Date;
	
	adresa: string;
	
	telefon: string;
	
	email: string;

}

export class PcelarPost{


    ime: string;
	
	prezime: string;
	
	datumRodjenja: Date;
	
	adresa: string;
	
	telefon: string;
	
    email: string;
    
    user: string;

}

export class KupacPost{

	
    ime: string;
	
	prezime: string;
	
	datumRodjenja: Date;
	
	adresa: string;
	
	telefon: string;
	
	email: string;

    user: string;
}

export class UserRequest{

	id :number;
	
    ime: string;
	
	prezime: string;
	
	datumRodjenja: Date;
	
	adresa: string;
	
	telefon: string;
	
	email: string;
	username: string;
    password: string;
    role: string;

}