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

import { DeleteRecordDialogComponent } from './../../shared/delete-record-dialog/delete-record-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SecurityQuestionService } from './../../shared/services/security-question.service';
import { SecurityQuestion } from './../../shared/models/security-question.interface';

@Component({
  selector: 'app-security-question-list',
  templateUrl: './security-question-list.component.html',
  styleUrls: ['./security-question-list.component.css']
})
export class SecurityQuestionListComponent implements OnInit {

  securityQuestions!: SecurityQuestion[];
  displayedColumns = ['question', 'functions'];

  constructor(private dialog: MatDialog, private securityQuestionService: SecurityQuestionService) {

    // REPLACE OUTDATED SUBSCRIBE CODE
    // this.securityQuestionService.findAllSecurityQuestions().subscribe(res => {
    //   this.securityQuestions = res['data'];
    // }, err => {
    //   console.log(err);
    // });

    // UPDATED SUBSCRIBE CODE
    this.securityQuestionService.findAllSecurityQuestions().subscribe({
      next: (res) => {
        this.securityQuestions = res['data'];
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  ngOnInit(): void {
  }

  delete(recordId: string): void {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        recordId,
        dialogHeader: 'Delete Record Dialog',
        dialogBody: 'Are you sure you want to delete the selected security question?'
      },
      disableClose: true,
      width: '800px'
    });

    // REPLACE OUTDATED SUBSCRIBE CODE
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === 'confirm') {
    //     this.securityQuestionService.deleteSecurityQuestion(recordId).subscribe(res => {
    //       console.log('Security question deleted');
    //       this.securityQuestions = this.securityQuestions.filter(q => q._id !== recordId);
    //     });
    //   }
    // });

    // UPDATED SUBSCRIBE CODE
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result === 'confirm') {
          this.securityQuestionService.deleteSecurityQuestion(recordId).subscribe({
            next: (res) => {
              console.log('Security question deleted');
              this.securityQuestions = this.securityQuestions.filter(q => q._id !== recordId);
            }
          })
        }
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
}
