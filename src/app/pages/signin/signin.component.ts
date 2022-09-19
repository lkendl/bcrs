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
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Message } from 'primeng/api/message';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.interface';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  errorMessages: Message[] = [];

  // Create user variable to store the login information.
  user: User;

  // Use the FormBuilder to create a new FormGroup with one FormControl named id.
  signinForm: FormGroup = this.fb.group({
    userName: [null, Validators.compose([Validators.required])],
    password: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')])] // Adds Angular's built-in Validator to the form.
  })

  // Add dependency injections for FormBuilder, Router, cookieService and sessionService.
  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private http: HttpClient, private sessionService: UserService) {

    // Define User object as an empty User object.
    this.user = {} as User;
  }

  ngOnInit(): void {
  }

  signin() {
    // Get userName and password input values from form.
    const userName = this.signinForm.controls['userName'].value;
    const password = this.signinForm.controls['password'].value;

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
     this.http.post('/api/session/signin', {
      userName,
      password
      // Call API and subscribe to event.
    }).subscribe({
      next: (res:any) => {
        // If there is a value inside user, it will be true here. If true, add to cookie service. Use .data property from the baseResponse object.
        if (res['data']) {
           // Store response data inside the empty employee object.
           this.user = res['data'];
        }
        console.log(res['data']);
        this.cookieService.set('sessionuser', res['data'].userName, 1);
        this.router.navigate(['/']);
        /*
        if (res['data'].userName) {
        }*/
      },
      error: (e) => {
        this.errorMessages = [
          { severity: 'error', summary: "Error", detail: e.message }
        ]
        console.log(e);
      }
    });
  }
}
