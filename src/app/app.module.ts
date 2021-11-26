import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ConfirmUserComponent } from './auth/confirm-user/confirm-user.component'
import { LoginComponent } from './auth/login/login.component'
import { RegisterComponent } from './auth/register/register.component'
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component'
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component'
import { NavbarComponent } from './layouts/navbar/navbar.component'
import { HomeComponent } from './pages/home/home.component'
import { VideoChatComponent } from './pages/video-chat/video-chat.component'
import { CalendarModule, DateAdapter } from 'angular-calendar'
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ScheduleComponent } from './pages/schedule/schedule.component'
import { CommonModule } from '@angular/common'
import { FlatpickrModule } from 'angularx-flatpickr';
import { DoctorListComponent } from './pages/doctor-list/doctor-list.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeLayoutComponent,
        LoginLayoutComponent,
        HomeComponent,
        ConfirmUserComponent,
        NavbarComponent,
        VideoChatComponent,
        ScheduleComponent,
        DoctorListComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        BrowserAnimationsModule,
        FlatpickrModule.forRoot(),
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
