import { Component } from '@angular/core';
import { AuthJwtService } from 'src/app/services/authentication/auth-jwt.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})

export class LoginComponent {
  login_form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private auth: AuthJwtService, private router: Router) {}

  login_user() {
    if (this.login_form.valid) 
    {
      this.auth.login(this.login_form.value).subscribe(
        (server_response) => 
        {
          console.log(server_response);
          this.router.navigate(['start']);
        },
        (error) => 
        {
          console.error('There was an error during the login process.', error);
        }
      );
    } 
    else 
    {
      console.error('Some data in the forms are invalid!');
    }
  }
}