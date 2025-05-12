import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { ButtonComponent } from '../components/button/button.component';
import { ErrorTextComponent } from '../components/error-text/error-text.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ButtonComponent,
    ErrorTextComponent,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginComponent, // a regular component declared in this module
      },
      {
        path: 'register',
        component: RegisterComponent, // a regular
      },
    ]),
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoginFormComponent,
    RegisterFormComponent,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    LoginFormComponent,
    RegisterFormComponent,
  ],
  providers: [AuthService],
})
export class AuthModule {}
