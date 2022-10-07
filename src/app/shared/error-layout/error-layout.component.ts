/*
============================================
; Title: bcrs
; Author: Professor Krasso
; Date: 1 October 2022
; Modified By: Seth Kerrey, Laura Kendl
; Description: The Bob's Computer Repair Shop (BCRS) application calculates
; service repair fees, generates invoices, and tracks purchases by service.
===========================================
*/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-layout',
  templateUrl: './error-layout.component.html',
  styleUrls: ['./error-layout.component.css']
})
export class ErrorLayoutComponent implements OnInit {
  year: number = Date.now();
  userName: string;

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
