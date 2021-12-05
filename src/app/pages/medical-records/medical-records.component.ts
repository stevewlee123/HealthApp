import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  userId? : string;
  @Input() aList;
  constructor(private api: APIService,
    private http: HttpClient,
    private service:RecordsService,
    private data: DataService,
    private route: ActivatedRoute) {}

  async ngOnInit() {

    this.userId = this.route.snapshot.paramMap.get('id') || '';
      this.data.currentView.subscribe(message => this.currentView  = message)

      console.log(this.currentView)
  }


}
