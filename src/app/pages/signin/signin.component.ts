/*
============================================
; Title: bcrs
; Author: Professor Krasso
; Date: 14 September 2022
; Modified By: Seth Kerrey, Laura Kendl
; Description: The Bob's Computer Repair Shop (BCRS) application calculates
; service repair fees, generates invoices, and tracks purchases by service.
===========================================
*/

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Message } from 'primeng/api/message';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  form!: FormGroup;
  errorMessages!: Message[];

  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')])],
    });
  }

  signin(): void {
    const userName = this.form.controls['userName'].value;
    const password = this.form.controls['password'].value;

    // REPLACE OUTDATED SUBSCRIBE CODE
    // this.http.post('/api/session/signin', {
    //   userName,
    //   password
    // }).subscribe(res => {
    //   console.log(res['data']);
    //   this.cookieService.set('sessionuser', res['data'].userName, 1);
    //   this.router.navigate(['/']);
    //   /*
    //   if (res['data'].userName) {
    //   }*/
    //   }, err => {
    //     this.errorMessages = [
    //       { severity: 'error', summary: "Error", detail: err.message }
    //     ]
    //     console.log(err);
    // });

     // UPDATED SUBSCRIBE CODE - UNCOMMENT TO FIX 'DATA' ERROR
    //  this.http.post('/api/session/signin', {
    //   userName,
    //   password
    // }).subscribe({
    //   next: (res) => {
    //     console.log(res['data']);
    //     this.cookieService.set('sessionuser', res['data'].userName, 1);
    //     this.router.navigate(['/']);
        /*
        if (res['data'].userName) {
        }*/
    //   },
    //   error: (e) => {
    //     this.errorMessages = [
    //       { severity: 'error', summary: "Error", detail: e.message }
    //     ]
    //     console.log(e);
    //   }
    // });
  }
}
