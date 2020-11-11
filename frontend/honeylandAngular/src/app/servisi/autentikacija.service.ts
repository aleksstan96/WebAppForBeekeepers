import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutentikacijaService {

  constructor( private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.isUserLoggedIn()){
      return true;
    }else{
      this.router.navigate(['/']); //da ne idemo na blank page vec da nas vrati na login stranicu
      return false;
    }
    
  }

  isUserLoggedIn(){
    let user =  localStorage.getItem('userId');
    //console.log(user)
    return !(user===null);
  }
}
