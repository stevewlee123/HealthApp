import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Auth from '@aws-amplify/auth';
import { APIService, UserType } from 'src/app/API.service';
import { DataService } from 'src/app/pages/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userId?: string
  userTypeList = "Doctors"
  doctorView = false;
  constructor(private api:APIService, private router: Router
    ) { }

  ngOnInit(): void {
    Auth.currentAuthenticatedUser()
      .then(async user => {
        this.userId = user.attributes.sub
        const dbUser = await this.api.GetUser(this.userId!)
        console.log(dbUser)
        if(dbUser.type === UserType.doctor){
          console.log("Here")
          this.userTypeList = "Patients"
          this.doctorView = true;
        }
      })

  }


  logOut() {
    Auth.signOut()
      .then(data => {console.log(data); this.router.navigate(['/login'])})
      .catch(err => console.log(err));
  }

}
