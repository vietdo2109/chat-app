import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
type LoginData = {
  email: string;
  password: string;
  rememberMe: boolean;
};
type LoginError = {
  email?: string;
  password?: string;
  invalid?: string;
};
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  standalone: false,
})
export class LoginFormComponent {
  data: LoginData = {
    email: '',
    password: '',
    rememberMe: false,
  };
  status: 'idle' | 'pending' | 'success' | 'error' = 'idle';
  error: LoginError = {};

  constructor(private authService: AuthService, private router: Router) {}
  handleSubmit() {
    this.error = {};

    this.onLogin();
  }

  onLogin() {
    this.status = 'pending';
    let isFormValid = this.validateForm();
    if (isFormValid) {
      this.authService.onLogin(this.data).subscribe({
        next: (res) => {
          console.log(res.message);
          this.status = 'success';
          // navigate, show toast, etc.
          this.router.navigate(['/messages']);
        },
        error: (err) => {
          if (err.error == 'No user with this email!') {
            this.error = {
              ...this.error,
              email: 'No user with this email!',
            };
            console.log(err);
          } else if (err.error == 'Email and/or password are incorrect!') {
            this.error = {
              password: 'Email and/or password are incorrect!',
              email: 'Email and/or password are incorrect!',
            };
            console.log(err);
          }
          this.status = 'error';
          // Show error message
        },
      });
    }
  }

  validateForm() {
    let isValid = true;

    if (this.data.email === '') {
      isValid = false;
      this.error = {
        ...this.error,
        email: 'this field id required',
      };
    } else {
      const { email, ...rest } = this.error;
      this.error = rest;
    }

    if (this.data.password === '') {
      isValid = false;
      this.error = {
        ...this.error,
        password: 'this field id required',
      };
    } else {
      const { password, ...rest } = this.error;
      this.error = rest;
    }
    this.status = 'error';
    return isValid;
  }
}
