/*
============================================
; Tile: bcrs
; Author: Professor Krasso
; Date: 3 October 2022
; Modified By: Seth Kerrey, Laura Kendl
; Description: The Bob's Computer Repair Shop (BCRS) application calculates
; service repair fees, generates invoices, and tracks purchases by service.
===========================================
*/

import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/shared/models/line-item.interface';
import { Product } from 'src/app/shared/models/product.interface';
import { Invoice } from 'src/app/shared/models/invoice';
import { Message } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { InvoiceService } from 'src/app/shared/services/invoice.service';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceSummaryDialogComponent } from 'src/app/shared/invoice-summary-dialog/invoice-summary-dialog.component';

@Component({
  selector: 'app-service-repair',
  templateUrl: './service-repair.component.html',
  styleUrls: ['./service-repair.component.css']
})
export class ServiceRepairComponent implements OnInit {

  username: string;
  products: Product[];
  lineItems: LineItem[];
  invoice: Invoice;
  errorMessages: Message[];
  successMessages: Message[];

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private productService: ProductService,
    private invoiceService: InvoiceService,
    private dialogRef: MatDialog
  ) {
    this.username = this.cookieService.get('sessionuser') ?? '';
    this.products = [];
    this.lineItems = [];
    this.invoice = {} as Invoice;
    this.errorMessages = [];
    this.successMessages = [];

    this.products = this.productService.getProducts();

    this.invoice = new Invoice(this.username);

    console.log(this.products);
  }

  ngOnInit(): void {
  }

  generateInvoice() {
    console.log('generateInvoice() this.invoice');
    console.log(this.invoice);

    console.log('generateInvoice() this.products');
    console.log(this.products);

    for (let product of this.products) {
      if (product.checked) {
        this.lineItems.push(product);
      }
    }

    if (this.lineItems.length > 0) {
      this.invoice.setLineItems(this.lineItems);

      console.log('lineItems.length > 0; this.invoice');
      console.log(this.invoice);

      const dialogRef = this.dialogRef.open(InvoiceSummaryDialogComponent, {
        data: {
          invoice: this.invoice
        },
        disableClose: true,
        width: '800px'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'confirm') {
          this.invoiceService.createInvoice(this.username, this.invoice).subscribe({
            next: (res) => {
              console.log('Invoice created');
              this.reloadProducts();
              this.clearLineItems();
              this.invoice.clear();
              this.successMessages = [
                { severity: 'success', summary: 'Success', detail: 'Your order has been processed successfully.'}
              ]
            },
            error: (e) => {
              console.log(e);
            }
          })
        } else {
          console.log('order canceled');
          this.reloadProducts();
          this.clearLineItems();
          this.invoice.clear();
        }
      })
    } else {
      this.errorMessages = [
        { severity: 'error', summary: 'Error', detail: 'You must select at least one service'}
      ]
    }
  }

  reloadProducts() {
    for (let product of this.products) {
      product.checked = false;
    }
  }

  clearLineItems() {
    this.lineItems = [];
  }

}
