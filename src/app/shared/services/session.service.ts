/*
============================================
; Title: bcrs
; Author: Professor Krasso
; Date: 17 September 2022
; Modified By: Seth Kerrey, Laura Kendl
; Description: The Bob's Computer Repair Shop (BCRS) application calculates
; service repair fees, generates invoices, and tracks purchases by service.
===========================================
*/


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

/**
 * findUserById
 */
// Define the service that calls the node.js API. Pass the id that returns an observable.
  findUserById(id: string): Observable<any> {
    // Pass the id and append it to the /api/users route.
    return this.http.get('/api/users/' + id) // Any future changes to the route (e.g. version changes: "/api/v2/users") will be implemented here.
  }
}
