import { Component, OnInit } from '@angular/core'
import { APIService, CallStatus, UserType } from 'src/app/API.service'
import { startOfDay, endOfDay } from 'date-fns'
import Auth from '@aws-amplify/auth'
import { DataService } from '../data.service'
import { HttpClient } from '@angular/common/http'
@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    doctorView = false
    unApprovedCalls?
    videoCalls?
    rescheduleCall?
    newEventTimeSlot?: string = 'default'
    timeSlots = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30']
    constructor(
        private api: APIService,
        private data: DataService,
        private http: HttpClient
    ) {}

    async ngOnInit() {
        const today = new Date()

        Auth.currentAuthenticatedUser().then(async (user) => {
            const dbUser = await this.api.GetUser(user.attributes.sub)
            this.unApprovedCalls = dbUser.videoCalls?.items
                .filter((call) => call.videoCall.status == CallStatus.requested)
                .map((call) => call.videoCall)

            this.videoCalls = dbUser.videoCalls?.items
                .filter(
                    (call) =>
                        call.videoCall.status == CallStatus.approved &&
                        today > startOfDay(new Date(call.videoCall.time!)) &&
                        today < endOfDay(new Date(call.videoCall.time!))
                )
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
        const today = new Date()
        Auth.currentAuthenticatedUser().then(async (user) => {
            this.videoCalls = (
                await this.api.GetUser(user.attributes.sub)
            ).videoCalls?.items
                .filter(
                    (call) =>
                        call.videoCall.status == CallStatus.approved &&
                        today > startOfDay(new Date(call.videoCall.time!)) &&
                        today < endOfDay(new Date(call.videoCall.time!))
                )
                .map((call) => call.videoCall)
                
            this.unApprovedCalls = (
                await this.api.GetUser(user.attributes.sub)
            ).videoCalls?.items
                .filter((call) => call.videoCall.status == CallStatus.requested)
                .map((call) => call.videoCall)
        })
    }

    startReschedule(call) {
        this.rescheduleCall = call
    }

    async rescheduleEvent() {
        console.log(this.rescheduleCall, this.newEventTimeSlot)
        const oldTime = new Date(this.rescheduleCall.time)
        const eventTime = new Date(
            oldTime.toString().substring(0, 16)! +
                this.newEventTimeSlot! +
                oldTime.toString().substring(21)!
        )

        await this.api.UpdateVideoCall({
            id: this.rescheduleCall.id,
            time: eventTime.toISOString(),
            status: CallStatus.approved
        })
    }
}
