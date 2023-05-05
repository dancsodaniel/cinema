import { Component } from '@angular/core';
import { UserForm } from 'src/app/models/user-form.model';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerTitle: string = 'Register';
  secondaryButtonTitle: string = 'Login';
  loginUrl: string = '/login';
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) { }

  register(): void {
    this.auth.register(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  onSubmitForm(formValues: UserForm): void {
    this.email = formValues.email;
    this.password = formValues.password;
    this.register();
  }
}
