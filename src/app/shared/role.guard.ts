/*
============================================
; Title: bcrs
; Author: Professor Krasso
; Date: 28 September 2022
; Modified By: Seth Kerrey, Laura Kendl
; Description: The Bob's Computer Repair Shop (BCRS) application calculates
; service repair fees, generates invoices, and tracks purchases by service.
===========================================
*/

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { RoleService } from './services/role.service';
import { Role } from './models/role.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  role: Role;

  constructor(private router: Router, private cookieService: CookieService, private roleService: RoleService) {
    this.role = {} as Role;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Use pipe and map to handle promise service.
    return this.roleService.findUserRole(this.cookieService.get('sessionuser')).pipe(map(res => {
      this.role = res.data;

      console.log('User role: ' + this.role.text)
      console.log(this.role);

      if (res.data.role.text === 'admin') {
        return true;
      } else {
        this.router.navigate(['/error/admin-error']);
        return false;
      }
    }))
  }
}
