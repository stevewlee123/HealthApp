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
    username: new FormControl('', [Validators.required]),
    password: new FormControl(''),
  });

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogin(username: string, password: string) {
    from(this.auth.signIn(username, password)).subscribe(
      (user) => {
        console.log(user);
        this.router.navigate(['/']);
      },
      (err) => {
        console.error(err);
        if (err.code === 'UserNotConfirmedException') {
          this.router.navigate(['/confirmUser'], {
            queryParams: { username: username },
          });
        }
      }
    );
  }
}
