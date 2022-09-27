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
import { SelectedSecurityQuestion } from 'src/app/shared/models/selected-security-question.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { VerifySecurityQuestionModel } from 'src/app/shared/models/verify-security-question.interface';


@Component({
  selector: 'app-verify-security-questions',
  templateUrl: './verify-security-questions.component.html',
  styleUrls: ['./verify-security-questions.component.css']
})
export class VerifySecurityQuestionsComponent implements OnInit {
  year: number = Date.now();

  selectedSecurityQuestions: SelectedSecurityQuestion[];
  verifySecurityQuestionsModel: VerifySecurityQuestionModel;
  userName: string;
  errorMessages: Message[];


  form: FormGroup = this.fb.group({
    answerToSecurityQuestion1: [null, Validators.compose([Validators.required])],
    answerToSecurityQuestion2: [null, Validators.compose([Validators.required])],
    answerToSecurityQuestion3: [null, Validators.compose([Validators.required])]
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private sessionService: SessionService) {

      this.userName = this.route.snapshot.queryParamMap.get('userName') ?? '';
      this.errorMessages = [];
      this.verifySecurityQuestionsModel = {} as VerifySecurityQuestionModel;
      this.selectedSecurityQuestions = [];

      this.userService.findSelectedSecurityQuestions(this.userName).subscribe({
        next: (res) => {
          this.selectedSecurityQuestions = res.data;
          console.log(this.selectedSecurityQuestions);
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          this.verifySecurityQuestionsModel.question1 = this.selectedSecurityQuestions[0].questionText;
          this.verifySecurityQuestionsModel.question2 = this.selectedSecurityQuestions[1].questionText;
          this.verifySecurityQuestionsModel.question3 = this.selectedSecurityQuestions[2].questionText;

          console.log('Verify security questions model');
          console.log(this.verifySecurityQuestionsModel);
        }
      })
    }

  ngOnInit(): void {
  }

  verifySecurityQuestions() {
    this.verifySecurityQuestionsModel.answerToQuestion1 = this.form.controls['answerToSecurityQuestion1'].value;
    this.verifySecurityQuestionsModel.answerToQuestion2 = this.form.controls['answerToSecurityQuestion2'].value;
    this.verifySecurityQuestionsModel.answerToQuestion3 = this.form.controls['answerToSecurityQuestion3'].value;

    console.log(this.verifySecurityQuestionsModel);

    this.sessionService.verifySecurityQuestions(this.verifySecurityQuestionsModel, this.userName).subscribe({
      next: (res) => {
        console.log(res);
        if (res.message === 'Success') {
          this.router.navigate(['/session/reset-password'], {queryParams: {isAuthenticated: 'true', userName: this.userName}, skipLocationChange: true});
        } else {
          this.errorMessages = [
            {severity: 'error', summary: 'Error', detail: 'Unable to verify security question answers'}
          ]
          console.log('Unable to verify security question answers');
        }
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
}
