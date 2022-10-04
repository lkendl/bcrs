/**
============================================
; Title: bcrs
; Author: Professor Krasso
; Date: 28 September 2022
; Modified By: Seth Kerrey, Laura Kendl
; Description: The Bob's Computer Repair Shop (BCRS) application calculates
; service repair fees, generates invoices, and tracks purchases by service. 
===========================================
*/

import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  createInvoice(userName: string, invoice: Invoice): Observable<any> {
    return this.http.post(`/api/invoices/${userName}`, {
      userName: userName,
      lineItems: invoice.getLineItems(),
      partsAmount: invoice.partsAmount,
      laborAmount: invoice.getLaborAmount(),
      lineItemTotal: invoice.getLineItemTotal(),
      total: invoice.getTotal()
    })
  }

  findPurchasesByServiceGraph(): Observable<any> {
    return this.http.get(`/api/invoices/purchases-graph`);
  }
}
