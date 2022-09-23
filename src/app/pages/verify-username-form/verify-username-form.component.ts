/*
============================================
; Title: bcrs
; Author: Professor Krasso
; Date: 21 September 2022
; Modified By: Seth Kerrey, Laura Kendl
; Description: The Bob's Computer Repair Shop (BCRS) application calculates
; service repair fees, generates invoices, and tracks purchases by service. 
===========================================
*/

import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-verify-username-form',
  templateUrl: './verify-username-form.component.html',
  styleUrls: ['./verify-username-form.component.css']
})
export class VerifyUsernameFormComponent implements OnInit {
  year: number = Date.now();

  errorMessages: Message[] = [];

  form: FormGroup = this.fb.group({
    userName: [null, Validators.compose([Validators.required])]
  });

  constructor(private fb: FormBuilder, private router: Router, private sessionService: SessionService) {
    this.errorMessages = [];
   }

  ngOnInit(): void {
  }

  verifyUser() {
    const userName = this.form.controls['userName'].value;

    this.sessionService.verifyUsername(userName).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/session/verify-security-questions'], {queryParams: {userName: userName}, skipLocationChange: true});
      },
      error: (e) => {
        this.errorMessages= [
          {severity: 'error', summary: 'Error', detail: e.message}
        ]
        console.log(e);
      }
    })
  }
}
