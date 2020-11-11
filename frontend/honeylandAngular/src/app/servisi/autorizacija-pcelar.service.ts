import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutorizacijaPcelarService {

  constructor(  private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    let role = localStorage.getItem('role');
    if(role=='b'){
      return true;
    }else{
      this.router.navigate(['/']); //da ne idemo na blank page vec da nas vrati na login stranicu
      return false;
    }
    
  }
}
