import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NgOtpInputModule } from 'ng-otp-input';
import { AuthServiceService } from '../../../../core/services/auth-service.service';

@Component({
  selector: 'app-verify-code',
  imports: [ReactiveFormsModule, NgOtpInputModule],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss',
})
export class VerifyCodeComponent {
  constructor(
    private authServiceService: AuthServiceService,
    private router: Router
  ) {}

  otpConfig = {
    length: 6,
    disableAutoFocus: false,
    inputClass: 'otp-input',

    inputStyles: {
      'font-size': '16px',
      width: '30px',
      height: '40px',
      margin: '0 4px',
      'text-align': 'center',
      border: '1px solid #ccc',
      'border-radius': '5px',
      padding: '5px',
    },
  };
  verifySpinner = false;

  verfiyCode = new FormGroup({
    resetCode: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{6}$'),
    ]),
  });
  sendverify() {
    this.verifySpinner = true;

    this.authServiceService.verifyResetCode(this.verfiyCode.value).subscribe({
      next: (resbonse) => {
        this.router.navigate(['forgotPassword/resetPassword']);
        this.verifySpinner = false;
        this.router.navigate(['forgotPassword/resetPassword']);
      },
      error: (error) => {
        console.log(error);
        this.verifySpinner = false;
      },
    });
  }
}
