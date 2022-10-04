/*
============================================
; Title: bcrs
; Author: Professor Krasso
; Date: 28 September 2022
; Modified By: Seth Kerrey, Laura Kendl
; Description: The Bob's Computer Repair Shop (BCRS) application calculates
; service repair fees, generates invoices, and tracks purchases by service.
===========================================
*/

import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/shared/services/invoice.service';

@Component({
  selector: 'app-purchases-by-service-graph',
  templateUrl: './purchases-by-service-graph.component.html',
  styleUrls: ['./purchases-by-service-graph.component.css']
})
export class PurchasesByServiceGraphComponent implements OnInit {

  purchases: any;
  data: any;
  itemCount: string[];
  labels: string[];

  constructor(private invoiceService: InvoiceService) {
    this.purchases = {};
    this.data = {};
    this.itemCount = [];
    this.labels = [];

    this.invoiceService.findPurchasesByServiceGraph().subscribe({
      next: (res) => {
        this.purchases = res.data;

        console.log(this.purchases);
        // Loop over the purchases to split out the services and item count
        for (const item of this.purchases) {
          console.log('Item object')
          console.log(item._id)

          let title = item._id.title;
          let count = item.count;

          this.labels.push(title);
          this.itemCount.push(count);
        }
        // Build the object literal for the primeNG bar graph
        this.data = {
          labels: this.labels, // Label for services
          datasets: [
            // Graph object
            {
              backgroundColor: [
                '#ED0A3F',
                '#FF8833',
                '#5FA777',
                '#0066CC',
                '#6B3FA0',
                '#AF593E',
                '#6CDAE7'
              ],
              hoverBackgroundColor: [
                '#ED0A3F',
                '#FF8833',
                '#5FA777',
                '#0066CC',
                '#6B3FA0',
                '#AF593E',
                '#6CDAE7'
              ],
              data: this.itemCount
            },
          ]
        };

        // Verify the data objects structure matches primeNG's expected format
        console.log('Data object');
        console.log(this.data);
      },
      error: (e) => {
        console.log(e)
      }
    })
  }

  ngOnInit(): void {
  }

}
