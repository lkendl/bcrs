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
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[];

  constructor() {
    this.products = [
      {
        id: 100,
        title: 'Password Reset',
        price: 39.99,
        checked: false
      },
      {
        id: 101,
        title: 'Spyware Removal',
        price: 99.9,
        checked: false
      },
      {
        id: 102,
        title: 'RAM Upgrade',
        price: 129.99,
        checked: false
      },
      {
        id: 103,
        title: 'Software Installation',
        price: 49.99,
        checked: false
      },
      {
        id: 104,
        title: 'PC Tune-up',
        price: 89.99,
        checked: false
      },
      {
        id: 105,
        title: 'Keyboard Cleaning',
        price: 45.00,
        checked: false
      },
      {
        id: 106,
        title: 'Disk Clean-up',
        price: 149.99,
        checked: false
      }
    ]
  }

  getProducts(): Product[] {
    return this.products;
  }
}
