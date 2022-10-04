/*
============================================
; Title: bcrs
; Author: Professor Krasso
; Date: 7 September 2022
; Modified By: Seth Kerrey, Laura Kendl
; Description: The Bob's Computer Repair Shop (BCRS) application calculates
; service repair fees, generates invoices, and tracks purchases by service.
; Resources:
; Stackblitz: https://stackblitz.com/edit/angular-table-reponsive-re1dnq?file=src%2Fapp%2Fapp.component.ts (Angular Table Responsive)
===========================================
*/

import { Component, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { DeleteRecordDialogComponent } from './../../shared/delete-record-dialog/delete-record-dialog.component';
import { UserService } from "src/app/shared/services/user.service";
import { User } from "src/app/shared/models/user.interface";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users!: User[];
  displayedColumns = [
    'userName',
    'firstName',
    'lastName',
    'role',
    'phoneNumber',
    'address',
    'email',
    'functions'
  ];

  constructor(private dialog: MatDialog, private userService: UserService) {

  // UPDATED SUBSCRIBE CODE
  this.userService.findAllUsers().subscribe({
    next: (res) => {
      this.users = res['data'];
      console.log(this.users);
    },
    error: (e) => {
      console.log(e);
    }
  });
}

ngAfterViewInit() {
}

  ngOnInit(): void {
  }

  delete(userId: string, recordId: string): void {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        recordId,
        dialogHeader: 'Confirmation',
        dialogBody: `Are you sure you want to delete user: ${recordId}?`
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result === 'confirm') {
          this.userService.deleteUser(userId).subscribe({
            next: (res) => {
            console.log('User delete');
            this.users = this.users.filter(u => u._id !== userId);
            },
            error: (e) => {
              console.log(e);
            }
          })
        }
      }
    })
  }
}
