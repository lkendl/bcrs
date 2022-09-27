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

export interface VerifySecurityQuestionModel {
  question1: string,
  question2: string,
  question3: string,
  answerToQuestion1: string,
  answerToQuestion2: string,
  answerToQuestion3: string
}
