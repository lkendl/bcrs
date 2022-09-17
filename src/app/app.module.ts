/*
============================================
; Title: bcrs
; Author: Professor Krasso
; Date: 7 September 2022
; Modified By: Seth Kerrey,& Laura Kendl
; Description: The Bob's Computer Repair Shop (BCRS) application calculates
; service repair fees, generates invoices, and tracks purchases by service. 
===========================================
*/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * Components
 */
// Pages
import { HomeComponent } from './pages/home/home.component';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { SecurityQuestionDetailsComponent } from './pages/security-question-details/security-question-details.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { SigninComponent } from './pages/signin/signin.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserListComponent } from './pages/user-list/user-list.component';
// Shared
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { DeleteRecordDialogComponent } from './shared/delete-record-dialog/delete-record-dialog.component';

/**
 * Angular material imports
 */
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { DialogModule } from '@angular/cdk/dialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SecurityQuestionCreateComponent,
    SecurityQuestionDetailsComponent,
    SecurityQuestionListComponent,
    SigninComponent,
    UserCreateComponent,
    UserDetailsComponent,
    UserListComponent,
    AuthLayoutComponent,
    BaseLayoutComponent,
    DeleteRecordDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DialogModule,
    MessageModule,
    MessagesModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
