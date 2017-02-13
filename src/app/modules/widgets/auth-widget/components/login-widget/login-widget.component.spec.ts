// /* tslint:disable:no-unused-variable */
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { FormBuilder } from '@angular/forms';
// import { LoginWidgetComponent } from './login-widget.component';

// import { FormValidationService } from '../../services/form-validation/form-validation.service';
// import { MobileContentService } from '../../services/mobile-content/mobile-content.service';
// import { UserInteractionService } from '../../services/user-interaction/user-interaction.service';

// describe('LoginWidgetComponent', () => {
//   let component: LoginWidgetComponent;
//   let fixture: ComponentFixture<LoginWidgetComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [LoginWidgetComponent],
//       providers: [FormBuilder, FormValidationService, MobileContentService, UserInteractionService],
//       schemas: [NO_ERRORS_SCHEMA]
//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(LoginWidgetComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('[login-widget.component] should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it(`[login-widget.component] select should default to 'HK'`, () => {
//     const countryCode = component.form.controls['countryNameCode'].value;
//     expect(countryCode).toEqual('HK');
//   });

//   it(`[login-widget.component] mobileNumberIsInputting$ should default to True`, async(() => {
//     component.mobileNumberIsInputting$
//       .subscribe(mobileNumberIsInputting => {
//         expect(mobileNumberIsInputting).toEqual(true);
//       });
//   }));

//   it(`[login-widget.component] passwordIsInputting$ should default to True`, async(() => {
//     component.passwordIsInputting$
//       .subscribe(passwordIsInputting => {
//         expect(passwordIsInputting).toEqual(true);
//       });
//   }));

//   it(`[login-widget.component] alter select should also alter mobileNumber's placeholder`, () => {
//     component.form.controls['countryNameCode'].setValue('CN');
//     fixture.detectChanges();
//     let ne = fixture.debugElement.queryAll(By.css('md-input'))[0].nativeElement;
//     expect(ne.placeholder).toEqual('131 2345 6789');

//     component.form.controls['countryNameCode'].setValue('HK');
//     fixture.detectChanges();
//     ne = fixture.debugElement.queryAll(By.css('md-input'))[0].nativeElement;
//     expect(ne.placeholder).toEqual('5123 4567');
//   });
// });
