import { Component, OnInit } from '@angular/core'
import { APIService, CallStatus } from 'src/app/API.service'
import { startOfDay, endOfDay } from 'date-fns'
import Auth from '@aws-amplify/auth'

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    unApprovedCalls?
    videoCalls?
    constructor(private api: APIService) {}

    async ngOnInit() {
        const today = Date.now()

        Auth.currentAuthenticatedUser().then(async (user) => {
            this.unApprovedCalls = (
                await this.api.GetUser(user.attributes.sub)
            ).videoCalls?.items
                .filter((call) => call.videoCall.status == CallStatus.requested)
                .map((call) => call.videoCall)

            this.videoCalls = (
                await this.api.GetUser(user.attributes.sub)
            ).videoCalls?.items
                .filter((call) => call.videoCall.status == CallStatus.approved)
                .map((call) => call.videoCall)

            console.log(user.attributes.sub)
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
