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
import { MedicalRecordsComponent } from './pages/medical-records/medical-records.component';
import { environment } from 'src/environments/environment'
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { RecordsComponent } from './pages/medical-records/record/record.component'
import { RecordsListComponent } from './pages/medical-records/record-list/record-list.component'
import { DataService } from './pages/data.service'
import { PdfViewerModule } from 'ng2-pdf-viewer';

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
        DoctorListComponent,
        MedicalRecordsComponent,
        RecordsComponent,
        RecordsListComponent
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireStorageModule ,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        BrowserAnimationsModule,
        PdfViewerModule ,
        FlatpickrModule.forRoot(),
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
    ],
    providers: [{provide: DataService}],
    bootstrap: [AppComponent]
})
export class AppModule {}
