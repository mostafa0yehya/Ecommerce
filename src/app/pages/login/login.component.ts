import { Component, inject, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthServiceService } from '../../core/auth-service.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  constructor(
    private authServiceService: AuthServiceService,
    private router: Router
  ) {}

  subscription!: Subscription;
  snackBar = inject(MatSnackBar);
  errorFromApi = '';
  showSpinner = false;
  formObj = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  handelLogin() {
    this.showSpinner = true;

    this.subscription = this.authServiceService
      .login(this.formObj.value)
      .subscribe({
        next: (response) => {
          localStorage.setItem('userToken', JSON.stringify(response.token));
          this.router.navigate(['/home']);
          this.showSpinner = false;
          this.authServiceService.isLoggedIn.next(true);
        },
        error: (error) => {
          this.snackBar.open(error.error.message, 'Ok', {
            panelClass: ['custom-snack', 'snack-error'],
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          this.showSpinner = false;
        },
      });

  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
