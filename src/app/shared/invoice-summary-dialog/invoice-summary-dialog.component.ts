/*
============================================
; Title: bcrs
; Author: Professor Krasso
; Date: 29 September 2022
; Modified By: Seth Kerrey, Laura Kendl
; Description: The Bob's Computer Repair Shop (BCRS) application calculates
; service repair fees, generates invoices, and tracks purchases by service. 
===========================================
*/

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invoice } from '../models/invoice';

@Component({
  selector: 'app-invoice-summary-dialog',
  templateUrl: './invoice-summary-dialog.component.html',
  styleUrls: ['./invoice-summary-dialog.component.css']
})
export class InvoiceSummaryDialogComponent implements OnInit {
  invoice: Invoice;
  username: string;
  orderDate: string;
  total: number;
  labor: number;
  parts: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.invoice = {} as Invoice;
    this.invoice = data.invoice;
    this.username = '';
    this.orderDate = '';
    this.total = 0;
    this.labor = 0;
    this.parts = 0;

    this.username = this.invoice.getUsername();
    this.orderDate = this.invoice.getOrderDate();
    this.parts = this.invoice.partsAmount;
    this.labor = this.invoice.getLaborAmount();
    this.total = this.invoice.getTotal();

    console.log(this.invoice);
   }

  ngOnInit(): void {
  }

}
