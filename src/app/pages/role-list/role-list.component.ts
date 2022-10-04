/*
============================================
; Title: bcrs
; Author: Professor Krasso
; Date: 28 September 2022
; Modified By: Seth Kerrey, Laura Kendl
; Description: The Bob's Computer Repair Shop (BCRS) application calculates
; service repair fees, generates invoices, and tracks purchases by service.
===========================================
*/

import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/shared/models/role.interface';
import { RoleService } from 'src/app/shared/services/role.service';
import { Confirmation, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRecordDialogComponent } from 'src/app/shared/delete-record-dialog/delete-record-dialog.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css'],
  providers: [ConfirmationService]
})
export class RoleListComponent implements OnInit {

  roles: Role[];
  errorMessages: Message[];

  roleForm: FormGroup = this.fb.group({
    text: [null, Validators.compose([Validators.required])]
  })

  constructor(private roleService: RoleService, private confirmationService: ConfirmationService, private fb: FormBuilder, private dialog: MatDialog) {
    this.roles = [];
    this.errorMessages = [];

    this.roleService.findAllRoles().subscribe({
      next: (res) => {
        console.log('this is the role-list constructor');
        console.log(res.data);
        this.roles = res.data;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  ngOnInit(): void {
  }

  create() {
    const newRole: Role = {
      text: this.roleForm.controls['text'].value
    }

    this.roleService.createRole(newRole).subscribe({
      next: (res) => {
        if (res.data) {
          this.roles.push(res.data);
        } else {
          this.errorMessages = [
            { severity: 'error', summary: 'Error', detail: res.message}
          ]
        }
      },
      error: (e) => {
        console.log(e)
      },
      complete: () => {
        this.roleForm.controls['text'].setErrors({'incorrect': false})
      }
    })
  }

  // delete(roleId: string) {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to delete this record?',
  //     header: 'Confirmation',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.roleService.deleteRole(roleId).subscribe({
  //         next: (res) => {
  //           console.log('Security question deleted successfully!');
  //           this.roles = this.roles.filter(role => role.id !== roleId); //changed _id to id
  //         },
  //         error: (e) => {
  //           console.log(e);
  //         }
  //       })
  //     },
  //     reject: (type: any) => {
  //       switch(type) {
  //         case ConfirmEventType.REJECT:
  //           console.log('User rejected this operation');
  //           break;
  //         case ConfirmEventType.CANCEL:
  //           console.log('User canceled this operation');
  //           break;
  //       }
  //     }
  //   })
  // }

  delete(roleId: string, recordId: string): void {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        recordId,
        dialogHeader: 'Confirmation',
        dialogBody: `Are you sure you want to delete role: ${recordId}?`
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.roleService.deleteRole(roleId).subscribe({
          next: (res) => {
          if (res.httpCode === 201) {
            this.errorMessages = [
              { severity: 'error', summary: 'Error', detail: res.message}
            ]
          } else {
            console.log('Role delete');
            this.roles = this.roles.filter(role => role._id !== roleId);
          }
          },
          error: (e) => {
            console.log(e.message);
          }
        });
      }
    });
  }
}
