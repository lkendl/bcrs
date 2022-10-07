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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityQuestionService } from './../../shared/services/security-question.service';
import { SecurityQuestion } from './../../shared/models/security-question.interface';

@Component({
  selector: 'app-security-question-details',
  templateUrl: './security-question-details.component.html',
  styleUrls: ['./security-question-details.component.css']
})

export class SecurityQuestionDetailsComponent implements OnInit {
  question!: SecurityQuestion;
  questionId!: string | null;
  form!: FormGroup;


  // this.form = this.fb.group({
  //   text: [null, Validators.compose([Validators.required])],
  // });

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private securityQuestionService: SecurityQuestionService) {
    this.questionId = this.route.snapshot.paramMap.get('questionId')!;

    // REPLACE OUTDATED SUBSCRIBE CODE
    // this.securityQuestionService.findSecurityQuestionById(this.questionId).subscribe(res => {
    //   this.question = res['data'];
    // }, err => {
    //   console.log(err);
    // }, () => {
    //   this.form.controls.text.setValue(this.question.text);
    // })

    // UPDATED SUBSCRIBE CODE
    this.securityQuestionService.findSecurityQuestionById(this.questionId).subscribe({
      next: (res) => {
        this.question = res['data'];
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.form.controls['text'].setValue(this.question.text);
    }});
  }

  ngOnInit(): void {
    // OUTDATED CODE - PLACED BEFORE CONSTRUCTOR
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  saveQuestion(): void {
    const updatedSecurityQuestion: SecurityQuestion = {
      text: this.form.controls['text'].value
    }

    // UPDATED SUBSCRIBE CODE
    this.securityQuestionService.updateSecurityQuestion(this.questionId!, updatedSecurityQuestion).subscribe({
      next: (res) => {
        this.router.navigate(['./employee/security-questions'])
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/employee/security-questions']);
  }
}
