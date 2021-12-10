import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { RegisterInput } from '../ types/auth/RegisterInput';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() {}

    //signUp submit
    signUp(registerUser: RegisterInput) {
        return Auth.signUp({
            username: registerUser.username,
            password: registerUser.password,
            attributes: {
                email: registerUser.email, // optional
                given_name: registerUser.firstName,
                family_name: registerUser.lastName // optional - E.164 number convention
                // Other custom attributes...
            },
            validationData: [] // optional
        })
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    }

    // signIn submit
    signIn(email: string, password: string) {
        return Auth.signIn(email, password);
    }

    
    confirmUser(username: string, code: string) {
        // After retrieveing the confirmation code from the user
        return Auth.confirmSignUp(username, code, {
            // Optional. Force user confirmation irrespective of existing alias. By default set to True.
            forceAliasCreation: true
        });
    }
}
