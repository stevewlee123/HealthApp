import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './auth/auth.guard'
import { ConfirmUserComponent } from './auth/confirm-user/confirm-user.component'
import { LoginComponent } from './auth/login/login.component'
import { RegisterComponent } from './auth/register/register.component'
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component'
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component'
import { DoctorListComponent } from './pages/doctor-list/doctor-list.component'
import { HomeComponent } from './pages/home/home.component'
import { MedicalRecordsComponent } from './pages/medical-records/medical-records.component'
import { RecordsListComponent } from './pages/medical-records/record-list/record-list.component'
import { RecordsComponent } from './pages/medical-records/record/record.component'
import { ScheduleComponent } from './pages/schedule/schedule.component'
import { VideoChatComponent } from './pages/video-chat/video-chat.component'

// App routing map
const routes: Routes = [
    {
        path: '',
        component: HomeLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'call/:id',
                component: VideoChatComponent
            },
            {
                path: 'schedule/:id',
                component: ScheduleComponent
            },
            {
              path: 'doctors',
              component: DoctorListComponent
            },
            {
                path: 'records/:id', component: MedicalRecordsComponent, children: [
                  { path: 'upload/:id', component: RecordsComponent},
                  { path: 'list/:id', component: RecordsListComponent}
                ]
              }
        ]
    },
    {
        path: '',
        component: LoginLayoutComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            { path: 'register', component: RegisterComponent },
            { path: 'confirmUser', component: ConfirmUserComponent }
        ]
    }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
