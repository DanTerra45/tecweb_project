import { Component } from '@angular/core';
import { AuthJwtService } from 'src/app/services/authentication/auth-jwt.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})

export class RegisterComponent {
  register_form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private auth: AuthJwtService, private router: Router) {}

  register_user() {
    if (this.register_form.valid) 
    {
      this.auth.register(this.register_form.value).subscribe(
        (server_response) => 
        {
          console.log(server_response);
          this.router.navigate(['login']);
        },
        (error) => 
        {
          console.error('There was an error during the registration process.', error);
        }
      );
    } 
    else 
    {
      console.error('Some data in the forms are invalid!');
    }
  }
}