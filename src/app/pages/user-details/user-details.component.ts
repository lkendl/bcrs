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
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from "src/app/shared/services/user.service";
import { User } from "src/app/shared/models/user.interface";
import { RoleService } from './../../shared/services/role.service';
import { Role } from "../../shared/models/role.interface";
import { Message } from "primeng/api";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User;
  userId: string;
  errorMessages: Message[];
  roles: Role[];

  form: FormGroup = this.fb.group({
    firstName: [null, Validators.compose([Validators.required])],
    lastName: [null, Validators.compose([Validators.required])],
    phoneNumber: [null, Validators.compose([Validators.required])],
    address: [null, Validators.compose([Validators.required])],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    role: [null, Validators.compose([Validators.required])]
  });

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private userService: UserService, private roleService: RoleService ) {
    this.userId = this.route.snapshot.paramMap.get('userId') ?? '';
    this.user = {} as User;
    this.errorMessages = [];
    this.roles = [];

  // UPDATED SUBSCRIBE CODE
  this.userService.findUserById(this.userId).subscribe({
    next: (res) => {
      this.user = res.data;
      console.log('User object from findUserById call')
      console.log(this.user)
    },
    error: (e) => {
      console.log(e);
    },
    complete: () => {
      this.form.controls['firstName'].setValue(this.user.firstName);
      this.form.controls['lastName'].setValue(this.user.lastName);
      this.form.controls['phoneNumber'].setValue(this.user.phoneNumber);
      this.form.controls['address'].setValue(this.user.address);
      this.form.controls['email'].setValue(this.user.email);
      this.form.controls['role'].setValue(this.user.role?.text ?? 'standard'); // If text is null, default to 'standard'

      console.log(this.user);

      // API to call roleService to retrieve list roles in database
      this.roleService.findAllRoles().subscribe({
        next: (res) => {
          this.roles = res.data;
        },
        error: (e) => {
          console.log(e);
        }
      })
    }
  });
}

  ngOnInit(): void {
  }

  saveUser(): void {
    const updatedUser = {
      firstName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value,
      phoneNumber: this.form.controls['phoneNumber'].value,
      address: this.form.controls['address'].value,
      email: this.form.controls['email'].value,
     // Create the role object with the input from the form control.
      role: {
        text: this.form.controls['role'].value
      }
    };

  // UPDATED SUBSCRIBE CODE
  this.userService.updateUser(this.userId, updatedUser).subscribe({
    next: (res) => {
      this.router.navigate(['/employee/users']);
    },
    error: (e) => {
      this.errorMessages = [
        { severity: 'error', summary: 'Error', detail: e.message }
      ]
      console.log(`Node.js server error; httpCode:${e.httpCode};message:${e.message}`)
      console.log(e);
    }
  });
}

  cancel(): void {
    this.router.navigate(['/employee/users']);
  }
}
