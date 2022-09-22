import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifySecurityQuestionsComponent } from './verify-security-questions.component';

describe('VerifySecurityQuestionsComponent', () => {
  let component: VerifySecurityQuestionsComponent;
  let fixture: ComponentFixture<VerifySecurityQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifySecurityQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifySecurityQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
