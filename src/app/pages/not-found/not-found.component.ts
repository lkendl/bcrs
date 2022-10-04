/*
============================================
; Title: bcrs
; Author: Professor Krasso
; Date: 18 September 2022
; Modified By: Seth Kerrey, Laura Kendl
; Description: The Bob's Computer Repair Shop (BCRS) application calculates
; service repair fees, generates invoices, and tracks purchases by service.
===========================================
*/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  year: number = Date.now();
  userName: string;
  getMouseCoords = {};


  constructor(private cookieService: CookieService, private router: Router) {
    this.userName = this.cookieService.get('sessionuser') ?? '';
  }

  ngOnInit(): void {
  }

  back() {
    if (this.userName) {
      this.router.navigate(['/employee']);
    } else {
      this.router.navigate(['/']);
    }
  }

}
