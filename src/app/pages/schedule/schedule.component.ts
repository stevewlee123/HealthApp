import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { CalendarEvent, CalendarEventTitleFormatter, CalendarView } from 'angular-calendar'
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
import { from, Observable } from 'rxjs'
import { APIService, VideoCall } from 'src/app/API.service'
import { Router } from '@angular/router'
import { CustomEventTitleFormatter } from './ custom-event-title-formatter.provider'

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'schedule.component.html',
    providers: [
      {
        provide: CalendarEventTitleFormatter,
        useClass: CustomEventTitleFormatter,
      },
    ],
})
export class ScheduleComponent implements OnInit {
    view: CalendarView = CalendarView.Month

    //events: CalendarEvent<{ call: VideoCall }>[] = []

    viewDate: Date = new Date()

    events$?: Observable<CalendarEvent<{ call: VideoCall }>[]>

    activeDayIsOpen: boolean = false

    constructor(private api: APIService, private router: Router) {}

    async ngOnInit() {
        await this.fetchEvents()
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
            this.api.ListVideoCalls({
                time: {
                    gt: getStart(this.viewDate).toISOString(),
                    lt: getEnd(this.viewDate).toISOString()
                }
            })
        ).pipe(
            map((calls) => {
                return calls.items!.map((call) => {
                    return {
                        title: 'test',
                        start: new Date(call?.time!),
                        color: {
                            primary: '#e3bc08',
                            secondary: '#FDF1BA'
                        },
                        allDay: false,
                        meta: {
                            call
                        }
                    } as CalendarEvent<{ call: VideoCall }>
                })
            })
        )
    }

    dayClicked({
        date,
        events
    }: {
        date: Date
        events: CalendarEvent<{ call: VideoCall }>[]
    }): void {
        console.log(date, events)
        console.log("This viewDate", this.viewDate)
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
        console.log(event)
        this.router.navigate(['/call', event.meta?.call.id])
    }
}
