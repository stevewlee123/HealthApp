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
    doctors: User[] = []
    constructor(private api: APIService,
        ) {}

    async ngOnInit() {
        this.doctors = (await this.api.ListUsers({ type: { eq: UserType.patient } }))
            .items as User[]
        console.log(this.doctors)
    }
}
