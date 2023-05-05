import { Component } from '@angular/core';
import { UserForm } from 'src/app/models/user-form.model';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  title: string = 'Change Password';
  secondaryButtonTitle: string = 'Cancel';
  redirectUrl: string = '/movies';

  constructor(private auth: AuthService) { }

  onSubmitForm(formValues: UserForm) {
    this.auth.changePassword(formValues.password, formValues.newPassword);
  }
  
}
