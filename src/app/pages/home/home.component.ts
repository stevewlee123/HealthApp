import { Component, OnInit } from '@angular/core'
import { APIService, CallStatus, UserType } from 'src/app/API.service'
import { startOfDay, endOfDay } from 'date-fns'
import Auth from '@aws-amplify/auth'
import { DataService } from '../data.service'
@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    doctorView = false
    unApprovedCalls?
    videoCalls?
    constructor(private api: APIService,
        private data: DataService) {}

    async ngOnInit() {
        const today = Date.now()

        Auth.currentAuthenticatedUser().then(async (user) => {
            const dbUser = await this.api.GetUser(user.attributes.sub)
            this.unApprovedCalls = dbUser.videoCalls?.items
                .filter((call) => call.videoCall.status == CallStatus.requested)
                .map((call) => call.videoCall)

            this.videoCalls = dbUser.videoCalls?.items
                .filter((call) => call.videoCall.status == CallStatus.approved)
                .map((call) => call.videoCall)

            console.log(user.attributes.sub)
            if (dbUser.type === UserType.doctor) {
                this.doctorView = true
            }
            this.data.changeMessage(this.doctorView)
        })
    }

    async approveCallRequest(callId: string) {
        console.log(
            await this.api.UpdateVideoCall({
                id: callId,
                status: CallStatus.approved
            })
        )
        Auth.currentAuthenticatedUser().then(async (user) => {
            this.videoCalls = (
                await this.api.GetUser(user.attributes.sub)
            ).videoCalls?.items
                .filter((call) => call.videoCall.status == CallStatus.approved)
                .map((call) => call.videoCall)
        })
    }
}
