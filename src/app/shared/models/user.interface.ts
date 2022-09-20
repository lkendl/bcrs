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

export interface User {
    _id?: string;
    userName?: string;
    password?: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    email: string;
}
