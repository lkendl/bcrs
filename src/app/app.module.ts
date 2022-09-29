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

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

/**
 * Components
 */
// Pages
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { SecurityQuestionDetailsComponent } from './pages/security-question-details/security-question-details.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { SigninComponent } from './pages/signin/signin.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerifySecurityQuestionsComponent } from './pages/verify-security-questions/verify-security-questions.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ErrorComponent } from './pages/error/error.component';
import { VerifyUsernameFormComponent } from './pages/verify-username-form/verify-username-form.component';

// Shared
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { DeleteRecordDialogComponent } from './shared/delete-record-dialog/delete-record-dialog.component';

// Services
import { CookieService } from 'ngx-cookie-service';

/**
 * Angular material imports
 */
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatList, MatListModule } from '@angular/material/list';
import { MatMenu } from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';

// Dialog
import { DialogModule } from '@angular/cdk/dialog';

/**
 * PrimeNG
 */
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { InvoiceSummaryDialogComponent } from './shared/invoice-summary-dialog/invoice-summary-dialog.component';

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    AuthLayoutComponent,
    BaseLayoutComponent,
    ContactComponent,
    DeleteRecordDialogComponent,
    HomeComponent,
    NotFoundComponent,
    SecurityQuestionCreateComponent,
    SecurityQuestionDetailsComponent,
    SecurityQuestionListComponent,
    SigninComponent,
    UserCreateComponent,
    UserDetailsComponent,
    UserListComponent,
    RegisterComponent,
    VerifySecurityQuestionsComponent,
    ResetPasswordComponent,
    ErrorComponent,
    VerifyUsernameFormComponent,
    RoleListComponent,
    InvoiceSummaryDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    ChartModule,
    ConfirmDialogModule,
    DialogModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatStepperModule,
    MatTableModule,
    MatToolbarModule,
    MessageModule,
    MessagesModule,
    ReactiveFormsModule,
    TableModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
