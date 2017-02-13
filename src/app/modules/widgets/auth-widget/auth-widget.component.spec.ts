// // /* tslint:disable:no-unused-variable */
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement, ElementRef, ViewRef, NO_ERRORS_SCHEMA } from '@angular/core';
// import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// import { FlexLayoutModule } from '@angular/flex-layout';
// import { MaterialModule, MaterialRootModule } from '@angular/material';
// import { AuthWidgetModule } from './auth-widget.module';
// import { AuthWidgetComponent } from './auth-widget.component';
// import { WrapperWidgetComponent } from './components/wrapper-widget/wrapper-widget.component';
// import { LoginWidgetComponent } from './components/login-widget/login-widget.component';
// import { SignupWidgetComponent } from './components/signup-widget/signup-widget.component';
// import { ForgotPasswordWidgetComponent } from './components/forgot-password-widget/forgot-password-widget.component';

// describe('AuthWidgetComponent', () => {
//   let component: AuthWidgetComponent;
//   let fixture: ComponentFixture<AuthWidgetComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         // AuthWidgetModule,
//         // CommonModule,
//         // ReactiveFormsModule,
//         // MaterialModule.forRoot(),
//         // FlexLayoutModule.forRoot()
//       ],
//       // providers: [FormBuilder],
//       declarations: [
//         AuthWidgetComponent,
//         WrapperWidgetComponent,
//         ForgotPasswordWidgetComponent
//         // LoginWidgetComponent,
//         // SignupWidgetComponent
//       ],
//       schemas: [ NO_ERRORS_SCHEMA ]
//     })
//     // .overrideModule(AuthWidgetModule, {remove: {imports: [FlexLayoutModule]}})
//     // .overrideModule(AuthWidgetModule, {add: {imports: [FlexLayoutModule.forRoot()]}})
//     // .overrideModule(AuthWidgetModule, {remove: {imports: [MaterialModule]}})
//     // .overrideModule(AuthWidgetModule, {add: {imports: [MaterialModule.forRoot()]}})
//     // .overrideModule(AuthWidgetModule, {set: {imports: [MaterialRootModule]}})
//     // .overrideModule(AuthWidgetModule, {remove: {imports: [MaterialModule, FlexLayoutModule]}})
//     // .overrideModule(AuthWidgetModule, {set: {imports: [MaterialModule.forRoot(), FlexLayoutModule.forRoot()]}})
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AuthWidgetComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('[auth-widget.component] should create', () => {
//     expect(component).toBeTruthy();
//     // expect(true).toBeTruthy();
//   });

//   it('[auth-widget.component] should default to the WrapperWidgetComponent', () => {
//     const ne = fixture.debugElement.query(By.directive(WrapperWidgetComponent)).nativeElement;
//     expect(ne).toBeTruthy();
//   });

//   it(`[auth-widget.component] should propagate to ForgotPasswordWidgetComponent when receive forgotPassword's event`, () => {
//     component.forgotPassword$.next();
//     const ne = fixture.debugElement.query(By.directive(ForgotPasswordWidgetComponent)).nativeElement;
//     expect(ne).toBeTruthy();
//   });

//   it(`[auth-widget.component] should propagate to ForgotPasswordWidgetComponent after receiving forgotPassword's event`, () => {
//     component.forgotPassword$.next();
//     let ne = fixture.debugElement.query(By.directive(ForgotPasswordWidgetComponent)).nativeElement;
//     expect(ne).toBeTruthy();
//     component.backward$.next();
//     ne = fixture.debugElement.query(By.directive(WrapperWidgetComponent)).nativeElement;
//     expect(ne).toBeTruthy();
//   });
// });
