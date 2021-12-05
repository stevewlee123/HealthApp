import { Component, OnInit } from '@angular/core'
import API from '@aws-amplify/api'
import Auth from '@aws-amplify/auth'
import { APIService, User, UserType } from 'src/app/API.service'

@Component({
    selector: 'app-doctor-list',
    templateUrl: './doctor-list.component.html',
    styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
    doctors: User[] = [];
    fetchUserType: UserType = UserType.doctor;
    uerType = false;
    constructor(private api: APIService,
    ) {}

    async ngOnInit() {
        Auth.currentAuthenticatedUser().then(async (user) => {
            const dbUser = await this.api.GetUser(user.attributes.sub!)
            console.log(dbUser)
            if (dbUser.type === UserType.doctor) {
                this.fetchUserType = UserType.patient
                this.uerType = true;
            }
            this.doctors = (await this.api.ListUsers({ type: { eq: this.fetchUserType} }))
            .items as User[]
        console.log(this.doctors)
        })

    }
}
