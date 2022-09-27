/*
============================================
; Title: bcrs
; Author: Professor Krasso
; Date: 20 September 2022
; Modified By: Seth Kerrey, Laura Kendl
; Description: The Bob's Computer Repair Shop (BCRS) application calculates
; service repair fees, generates invoices, and tracks purchases by service. 
===========================================
*/

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err => {

            /**
             * Handle 400 errors
             */
            if ([404].indexOf(err.status) !== -1) {
                this.router.navigate(['/session/404']);
            }

            /**
             * Handle 500 errors
             */
            if ([500].indexOf(err.status) !== -1) {
                this.router.navigate(['/session/500']);
            }

            // Otherwise, catch the error and throw
            const error = {
                message: err.error.message || err.message,
                httpCode: err.error.httpCode || err.status,
                url: err.url
            }

            console.log(`HttpInterceptor error; origin:${error.url};message:${error.message};httpCode:${error.httpCode}`);

            return throwError(() => error);
        }))
    }
}
