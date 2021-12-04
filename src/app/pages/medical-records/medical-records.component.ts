import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { APIService, User, UserType } from 'src/app/API.service'
import { DataService } from '../data.service';
import { RecordsService } from './medical-records.service';
@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.css']
})
export class MedicalRecordsComponent implements OnInit {

  users: User[] = []
  imageList!: any[];
  rowIndexArray!: any[];
  currentView = false;
  constructor(private api: APIService,
    private http: HttpClient,
    private service:RecordsService,
    private data: DataService) {}

  async ngOnInit() {

      this.service.getImageDetailList();

      this.data.currentView.subscribe(message => this.currentView  = message)

      console.log(this.currentView)
  }


}
