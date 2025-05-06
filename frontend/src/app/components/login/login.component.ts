import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  signInForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly navigate: Router
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signInForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = null;

    const credentials = this.signInForm.value;
    console.log(credentials);

    // this.auth.login(credentials).subscribe({
    //   next: (response) => {
    //     this.isLoading = false;
    //     localStorage.setItem('authToken', response.token);
    //     console.log('Login successful');
    //     this.navigate.navigate(['/']);
    //   },
    //   error: (error) => {
    //     this.isLoading = false;
    //     this.errorMessage =
    //       'Login failed. Please check your credentials and try again.';
    //     console.error('Login failed', error);
    //   },
    //   complete: () => {
    //     console.log('Login request completed.');
    //   },
    // });
  }
}
