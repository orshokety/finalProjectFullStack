import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../Services/users.service';
import { RouterHelper } from '../Helpers/RouterHelper';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {
  constructor(private ser : UsersService, private router:Router, private Error: MatSnackBar){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean{

    return new Observable<boolean>( observer => {
      this.ser.postUserType().subscribe(type => {
        if( type == "Employee" || type == "Admin" ) {
          observer.next(true);
        } else {
          observer.next(false);
          this.router.navigateByUrl(RouterHelper.home);
          this.Error.open("You dont have permissions or not logedin", "", {
            duration: 4000,
          });
        }

    })});

    }
}
