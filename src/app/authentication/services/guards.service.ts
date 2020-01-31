import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardsService implements CanActivate{

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    switch (route.routeConfig.path) {
      case "login":
        if(sessionStorage.getItem("access_token")){
          this.router.navigateByUrl('/pokedex');
        }
        break;
    
      default:
        if(!sessionStorage.getItem("access_token")){
          this.router.navigateByUrl('/login');
        }
        break;
    }

    return true;
  }
}

