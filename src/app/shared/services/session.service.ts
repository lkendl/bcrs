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

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.interface";
import { VerifySecurityQuestionModel } from "../models/verify-security-question.interface";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

  signin(userName: string, password: string): Observable<any> {
    return this.http.post('/api/session/signin', {
      userName,
      password
    })
  }

  register(user: User): Observable<any> {
    return this.http.post('/api/session/register', {
      userName: user.userName,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      selectedSecurityQuestions: user.selectedSecurityQuestions
    })
  }

  verifyUsername(userName: string): Observable<any> {
    return this.http.get('/api/session/verify/users/' + userName)
  }

  verifySecurityQuestions(model: VerifySecurityQuestionModel, userName: string): Observable<any> {
    return this.http.post('/api/session/verify/users/' + userName + '/security-questions', {
      questionText1: model.question1,
      questionText2: model.question2,
      questionText3: model.question3,
      answerText1: model.answerToQuestion1,
      answerText2: model.answerToQuestion2,
      answerText3: model.answerToQuestion3
    })
  }

  updatePassword(password: string, userName: string): Observable<any> {
    console.log('This is the service updatePassword');
    console.log(userName);
    return this.http.post('/api/session/users/' + userName + '/reset-password', {
      password
    })
  }
}
