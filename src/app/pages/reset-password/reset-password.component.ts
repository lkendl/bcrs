/*
============================================
; Title: bcrs
; Author: Professor Krasso
; Date: 22 September 2022
; Modified By: Seth Kerrey, Laura Kendl
; Description: The Bob's Computer Repair Shop (BCRS) application calculates
; service repair fees, generates invoices, and tracks purchases by service.
; Resources:
; Stackblitz: https://stackblitz.com/github/vigamage/stepper-component-wise?file=src%2Fapp%2Fcomponents%2Ffirst-step%2Ffirst-step.component.ts
===========================================
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from "../../shared/services/session.service";
import { VerifySecurityQuestionsComponent } from '../verify-security-questions/verify-security-questions.component';
import { VerifyUsernameFormComponent } from '../verify-username-form/verify-username-form.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  isAuthenticated: string;
  username: string;

  form: FormGroup = this.fb.group({
    password: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')])]
  });


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private sessionService: SessionService) {
    this.isAuthenticated = this.route.snapshot.queryParamMap.get('isAuthenticated') ?? '';
    this.username = this.route.snapshot.queryParamMap.get('username') ?? '';
  }

  ngOnInit(): void {
  }

  updatePassword() {
    const password = this.form.controls['password'].value;

    this.sessionService.updatePassword(password, this.username).subscribe({
      next: (res) => {
      this.cookieService.set('sessionuser', this.username, 1);
      this.router.navigate(['/']);
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  // Connect VerifySecurityQuestionsComponent and VerifyUsernameFormComponent into Matstepper

  @ViewChild('verifySqStep', { static: false }) verifySqStep!: VerifySecurityQuestionsComponent;
  @ViewChild('verifyUsernameStep', { static: false }) verifyUsernameStep!: VerifyUsernameFormComponent;

  get frmStepOne() {
    return this.verifySqStep ? this.verifySqStep.form : null;
 }

 get frmStepTwo() {
    return this.verifyUsernameStep ? this.verifyUsernameStep.form : null;
 }

}
