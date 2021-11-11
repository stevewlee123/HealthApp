import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogin(email: string, password: string) {
    from(this.auth.signIn(email, password)).subscribe(
      (user) => {
        console.log(user);
        this.router.navigate(['/']);
      },
      (err) => {
        console.error(err);
        if (err.code === 'UserNotConfirmedException') {
          this.router.navigate(['/confirmUser'], {
            queryParams: { username: email },
          });
        }
      }
    );
  }
}
