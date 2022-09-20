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

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user!: User;
  userId: string | null;
  form!: FormGroup;
  roles: any;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.userId = this.route.snapshot.paramMap.get('userId');

  //   this.userService.findUserById(this.userId!).subscribe(res => {
  //     this.user = res['data'];
  //   }, err => {
  //     console.log(err);
  //   }, () => {
  //     this.form.controls['firstName'].setValue(this.user.firstName);
  //     this.form.controls['lastName'].setValue(this.user.lastName);
  //     this.form.controls['phoneNumber'].setValue(this.user.phoneNumber);
  //     this.form.controls['address'].setValue(this.user.address);
  //     this.form.controls['email'].setValue(this.user.email);
  //   });
  // }

  // UPDATED SUBSCRIBE CODE
  this.userService.findUserById(this.userId!).subscribe({
    next: (res) => {
      this.user = res['data'];
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
    }
  });
}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
    });
  }

  saveUser(): void {
    const updatedUser: User = {
      firstName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value,
      phoneNumber: this.form.controls['phoneNumber'].value,
      address: this.form.controls['address'].value,
      email: this.form.controls['email'].value
    };

  //   this.userService.updateUser(this.userId!, updatedUser).subscribe(res => {
  //     this.router.navigate(['/users']);
  //   }, err => {
  //     console.log(err);
  //   });
  // }

  // UPDATED SUBSCRIBE CODE
  this.userService.updateUser(this.userId!, updatedUser).subscribe({
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
