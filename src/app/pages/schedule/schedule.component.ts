import { Component, ChangeDetectionStrategy, OnInit, Input } from '@angular/core'

import { map } from 'rxjs/operators'
import { v4 as uuidv4 } from 'uuid'
import {
    CalendarEvent,
    CalendarEventTitleFormatter,
    CalendarView
} from 'angular-calendar'
import {
    isSameMonth,
    isSameDay,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    startOfDay,
    endOfDay,
    format
} from 'date-fns'
import { from, Observable, Subject } from 'rxjs'
import { APIService, CallStatus, VideoCall } from 'src/app/API.service'
import { ActivatedRoute, Router } from '@angular/router'
import { CustomEventTitleFormatter } from './ custom-event-title-formatter.provider'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import Auth from '@aws-amplify/auth'
import { HttpClient } from '@angular/common/http'

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'schedule.component.html',
    providers: [
        {
            provide: CalendarEventTitleFormatter,
            useClass: CustomEventTitleFormatter
        }
    ]
})
export class ScheduleComponent implements OnInit {
    viewingSelf = false
    doctorId?: string
    doctorEmail?: string
    newEventTimeSlot?: string = 'default'
    timeSlots = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30']
    view: CalendarView = CalendarView.Month

    newEventTime?: Date

    refresh: Subject<any> = new Subject()

    //events: CalendarEvent<{ call: VideoCall }>[] = []

    viewDate: Date = new Date()

    clickedDate?: Date

    events$?: Observable<CalendarEvent<{ call: VideoCall }>[]>

    activeDayIsOpen: boolean = false

    constructor(
        private api: APIService,
        private router: Router,
        private route: ActivatedRoute,
        private http: HttpClient
    ) {}

    async ngOnInit() {
        console.log(this.route.snapshot.paramMap)
        this.doctorId = this.route.snapshot.paramMap.get('id') || ''
        console.log(this.doctorId)
        await this.fetchEvents()
        this.doctorEmail = (await this.api.GetUser(this.doctorId!)).email!
        Auth.currentAuthenticatedUser().then((user) => {
            if (this.doctorId === user.attributes.sub) {
                this.viewingSelf = true
            }
        })

        console.log(this.doctorEmail)
    }

    /*
    Get Calendar events for month. Based on the calendar view

    */
    fetchEvents(): void {
        const getStart: any = {
            month: startOfMonth,
            week: startOfWeek,
            day: startOfDay
        }[this.view]

        const getEnd: any = {
            month: endOfMonth,
            week: endOfWeek,
            day: endOfDay
        }[this.view]
        console.log(this.view)
        console.log(getStart(this.viewDate).toISOString())

        this.events$ = from(
            // this.api.ListVideoCalls({
            //     time: {
            //         gt: getStart(this.viewDate).toISOString(),
            //         lt: getEnd(this.viewDate).toISOString()
            //     },
            //     status: {
            //       eq: CallStatus.approved
            //     }
            // })
            this.api.GetUser(this.doctorId!)
        ).pipe(
            // map((calls) => {
            //     return calls.items!.map((call) => {
            //         return {
            //             title: call.title,
            //             start: new Date(call?.time!),
            //             color: {
            //                 primary: '#e3bc08',
            //                 secondary: '#FDF1BA'
            //             },
            //             allDay: false,
            //             meta: {
            //                 call
            //             }
            //         } as CalendarEvent<{ call: VideoCall }>
            //     })
            // })
            map((user) => {
                return user.videoCalls!.items!.map((call) => {
                    return {
                        title: call.videoCall.title,
                        start: new Date(call.videoCall.time!),
                        color: {
                            primary: '#e3bc08',
                            secondary: '#FDF1BA'
                        },
                        allDay: false,
                        meta: {
                            call: call.videoCall
                        }
                    } as CalendarEvent<{ call: VideoCall }>
                })
            })
        )
        console.log(this.events$)
    }

    dayClicked({
        date,
        events
    }: {
        date: Date
        events: CalendarEvent<{ call: VideoCall }>[]
    }): void {
        console.log(date, events)
        console.log('This viewDate', this.viewDate)
        this.clickedDate = date
        console.log(
            'Clicked Date',
            this.clickedDate.toISOString(),
            this.clickedDate.toTimeString()
        )
        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false
            } else {
                this.activeDayIsOpen = true
                this.viewDate = date
            }
        }
    }

    eventClicked(event: CalendarEvent<{ call: VideoCall }>): void {
        Auth.currentAuthenticatedUser().then((user) => {
            if (
                !!event.meta?.call.attendeeIds?.find(
                    (attendeeId) => attendeeId === user.attributes.sub
                )
            ) {
                this.router.navigate(['/call', event.meta?.call.id])
            }
        })
    }

    async requestEvent() {
        console.log(this.clickedDate?.toString(), this.newEventTimeSlot)

        const eventTime = new Date(
            this.clickedDate?.toString().substring(0, 16)! +
                this.newEventTimeSlot! +
                this.clickedDate?.toString().substring(21)!
        )
        const user = await Auth.currentAuthenticatedUser()
        const userId = user.attributes.sub
        console.log(userId)
        const attendees = [this.doctorId, userId]
        const args = {
            id: uuidv4(),
            time: eventTime.toISOString(),
            attendeeIds: attendees,
            email: this.doctorEmail,
            status: CallStatus.requested,
            title: `Appointment with ${user.attributes.given_name} ${user.attributes.family_name}`
        }

        this.http
            .post(
                'https://jkt8mfvus4.execute-api.us-east-1.amazonaws.com/dev/requestCall',
                JSON.stringify(args)
            )
            .subscribe((response) => console.log(response))
    }
}
