import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms'
import { Router } from '@angular/router'
import Auth from '@aws-amplify/auth'
import { from } from 'rxjs'
import { APIService, UserType } from 'src/app/API.service'
import { AuthService } from '../auth.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('')
    })

    loginError = false;

    get username() {
        return this.loginForm.get('username')
    }

    get password() {
        return this.loginForm.get('password')
    }

    constructor(
        private auth: AuthService,
        private router: Router,
        private api: APIService
    ) {}

    ngOnInit(): void {}

    // login founction
    onLogin(username: string, password: string) {
        from(this.auth.signIn(username, password)).subscribe(
            async (user) => {
                console.log(user)
                const existingUser = await this.api.GetUser(user.attributes.sub)
                if (!existingUser) {
                    const newUser = await this.api.CreateUser({
                        id: user.attributes.sub,
                        firstName: user.attributes.given_name,
                        lastName: user.attributes.family_name,
                        email: user.attributes.email,
                        type: UserType.patient
                    })

                    console.log(newUser, 'User Added to Database')
                } else {
                    console.log('Logged in as user', existingUser)
                }
                this.router.navigate(['/'])
            },
            (err) => {
                console.error(err)
                if (err.code === 'UserNotConfirmedException') {
                    this.router.navigate(['/confirmUser'], {
                        queryParams: { username: username }
                    })
                }
                else{
                    this.loginError = true;
                }
            }
        )
    }
}
