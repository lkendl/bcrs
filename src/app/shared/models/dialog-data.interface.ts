/**
============================================
; Title: bcrs
; Author: Professor Krasso
; Date: 16 September 2022
; Modified By: Seth Kerrey, Laura Kendl
; Description: The Bob's Computer Repair Shop (BCRS) application calculates
; service repair fees, generates invoices, and tracks purchases by service. 
===========================================
*/

// Create a single dialog object to pass over the data to display to the end user.
export interface DialogData {
  recordId: string;
  dialogHeader: string;
  dialogBody: string;
}
