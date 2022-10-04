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

import { LineItem } from "./line-item.interface";

export class Invoice {
  private username: string;
  private lineItems: LineItem[];
  private orderDate: string;
  private LABOR_RATE: number = 50;

  partsAmount: number;
  laborHours: number;

  constructor(username?: string, partsAmount?: number, laborHours?: number) {
    this.username = username || '';
    this.partsAmount = partsAmount || 0;
    this.laborHours = laborHours || 0;
    this.orderDate = new Date().toLocaleDateString();
    this.lineItems = [];
  }

  getUsername(): string {
    return this.username;
  }

  setLineItems(lineItems: LineItem[]): void {
    this.lineItems = lineItems;
  }

  getLineItems(): LineItem[] {
    return this.lineItems;
  }

  getLineItemTotal(): number {
    let total: number = 0;

    for (let lineItem of this.lineItems) {
      total += lineItem.price;
    }

    return Number(total);
  }

  getLaborAmount(): number {
    return Number(this.laborHours) * Number(this.LABOR_RATE);
  }

  getOrderDate(): string {
    return this.orderDate;
  }

  getTotal(): number {
    return Number(this.partsAmount) + Number(this.getLaborAmount()) + Number(this.getLineItemTotal());
  }

  clear() {
    this.partsAmount = 0;
    this.laborHours = 0;
    this.lineItems = [];
  }
}
