import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

type RegisterData = {
  email: string;
  password: string;
  username: string;
  rePassword: string;
};

type RegisterError = {
  email?: string;
  password?: string;
  username?: string;
  rePassword?: string;
};
@Component({
  selector: 'app-register-form',

  standalone: false,
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  data: RegisterData = {
    email: '',
    password: '',
    username: '',
    rePassword: '',
  };
  constructor(private authService: AuthService, private router: Router) {}
  status: 'idle' | 'pending' | 'success' | 'error' = 'idle';
  passwordValidation = [
    'PasswordTooShort',
    'PasswordRequiresNonAlphanumeric',
    'PasswordRequiresDigit',
    'PasswordRequiresUpper',
  ];
  error: RegisterError = {};
  handleSubmit() {
    this.onRegister();
  }

  onRegister() {
    this.status = 'pending';

    // validate form here before performing logic
    let isFormValid = this.validateForm();

    if (isFormValid) {
      try {
        this.authService
          .onRegister({
            username: this.data.username,
            email: this.data.email,
            password: this.data.password,
          })
          .subscribe({
            next: (res) => {
              localStorage.setItem('token', res.token);
              console.log('res', res);
              this.status = 'success';
              this.router.navigate(['/auth/login']);
            },
            error: (err) => {
              if (err.error[0]?.code === 'DuplicateUserName') {
                this.error = {
                  username: 'This username is already taken',
                };
              } else if (this.passwordValidation.includes(err.error[0]?.code)) {
                this.error = {
                  password:
                    'Password must be at least 12 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.',
                };
              } else if (err.error === 'This email is already taken') {
                this.error = {
                  email: 'This email is already taken',
                };
              } else if (err.error.errors?.Email) {
                this.error = {
                  email: 'Please enter a valid email',
                };
              }
              this.status = 'idle';

              console.error('error', this.error);
              // Show error message
            },
          });
      } catch (e) {
        this.status = 'idle';

        console.log(e);
      }
    }
  }

  validateForm(): boolean {
    let isValid: boolean = true;
    if (this.data.username == '') {
      this.error = {
        ...this.error,
        username: 'This field is required',
      };
      isValid = false;
      this.status = 'idle';
    } else {
      const { username, ...rest } = this.error;
      this.error = rest;
    }

    if (this.data.email == '') {
      this.error = {
        ...this.error,
        email: 'This field is required',
      };
      isValid = false;
      this.status = 'idle';
    } else {
      const { email, ...rest } = this.error;
      this.error = rest;
    }

    if (this.data.password == '') {
      this.error = {
        ...this.error,
        password: 'This field is required',
      };
      isValid = false;

      this.status = 'idle';
    } else {
      const { password, ...rest } = this.error;
      this.error = rest;
    }

    if (this.data.rePassword == '') {
      this.error = {
        ...this.error,
        rePassword: 'This field is required',
      };
      isValid = false;

      this.status = 'idle';
    } else {
      const { rePassword, ...rest } = this.error;
      this.error = rest;
    }

    if (
      this.data.password != '' &&
      this.data.password !== this.data.rePassword
    ) {
      this.status = 'idle';
      this.error = {
        ...this.error,
        rePassword: '2 passwords must match',
      };
      isValid = false;
      console.error('error', this.error);
    }

    return isValid;
  }
}
