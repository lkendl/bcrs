/*
============================================
; Tile: bcrs
; Author: Professor Krasso
; Date: 14 September 2022
; Modified By: Seth Kerrey, Laura Kendl
; Description: The Bob's Computer Repair Shop (BCRS) application calculates
; service repair fees, generates invoices, and tracks purchases by service.
===========================================
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityQuestionService } from './../../shared/services/security-question.service';
import { SecurityQuestion } from './../../shared/models/security-question.interface';

@Component({
  selector: 'app-security-question-create',
  templateUrl: './security-question-create.component.html',
  styleUrls: ['./security-question-create.component.css']
})
export class SecurityQuestionCreateComponent implements OnInit {
  form!: FormGroup;
  // this.form = this.fb.group({
  //   text: [null, Validators.compose([Validators.required])],
  // });

  constructor(private fb: FormBuilder, private router: Router, private securityQuestionService: SecurityQuestionService) {
  }

  ngOnInit(): void {
    // OUTDATED CODE - PLACED BEFORE CONSTRUCTOR
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  create(): void {
    const newSecurityQuestion: SecurityQuestion = {
      text: this.form.controls['text'].value
    }

    // UPDATED SUBSCRIBE CODE
    this.securityQuestionService.createSecurityQuestion(newSecurityQuestion).subscribe({
      next: (res) => {
        this.router.navigate(['/employee/security-questions'])
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  cancel(): void {
    this.router.navigate(['/employee/security-questions']);
  }
}
