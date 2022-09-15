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

import { Injectable } from "@angular/core";
import { User } from "./user.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  findAllUsers(): Observable<any> {
    return this.http.get('/api/users/');
  }

  findUserById(userId: string): Observable<any> {
    return this.http.get('/api/users/' + userId);
  }

  createUser(user: User): Observable<any> {
    return this.http.post('/api/users/', {
      userName: user.userName,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email
    })
  }

  updateUser(userId: string, user: User): Observable<any> {
    return this.http.put('/api/users/' + userId, {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email
    })
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete('/api/users/' + userId);
  }
}
