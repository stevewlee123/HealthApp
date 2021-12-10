import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import { from } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    // register data structures
    registerForm = new FormGroup({
        confirmPassword: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),

        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required])
    });

    //get email
    get email() {
        return this.registerForm.get('email');
    }

    //get the password
    get password() {
        return this.registerForm.get('password');
    }

    // get the confirmPassword
    get confirmPassword() {
        return this.registerForm.get('confirmPassword');
    }

    //get the firstName
    get firstName() {
        return this.registerForm.get('firstName');
    }

    get lastName() {
        return this.registerForm.get('lastName');
    }

    // get the username
    get username() {
      return this.registerForm.get('username')
    }

    constructor(private auth: AuthService) {}

    ngOnInit(): void {}

    // submit the register form
    onRegister() {
        from(this.auth.signUp(this.registerForm.value)).subscribe(
            (user) => console.log('Successfully Registered User', user),
            (err) => console.error('Error Occured: ', err)
        );
        console.log(this.registerForm.value);
    }
}
