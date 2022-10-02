/*
============================================
; Title: bcrs
; Author: Professor Krasso
; Date: 7 September 2022
; Modified By: Seth Kerrey, Laura Kendl
; Description: The Bob's Computer Repair Shop (BCRS) application calculates
; service repair fees, generates invoices, and tracks purchases by service.
===========================================
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from "src/app/shared/services/user.service";
import { User } from "src/app/shared/models/user.interface";
import { Role } from 'src/app/shared/models/role.interface';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  user!: User;
  userId!: string;
  form!: FormGroup;
  roles!: Role[];

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')])],
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      // role: [null, Validators.compose([Validators.required])]
    });
  }

  createUser(): void {
    const newUser: User = {
      userName: this.form.controls['userName'].value,
      password: this.form.controls['password'].value,
      firstName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value,
      phoneNumber: this.form.controls['phoneNumber'].value,
      address: this.form.controls['address'].value,
      email: this.form.controls['email'].value,
      // role: this.form.controls['role'].value
    };

  // UPDATED SUBSCRIBE CODE
  this.userService.createUser(newUser).subscribe({
    next: (res) => {
      this.router.navigate(['/users']);
    },
    error: (e) => {
      console.log(e);
    }
  });
}

  cancel(): void {
    this.router.navigate(['/users']);
  }
}
