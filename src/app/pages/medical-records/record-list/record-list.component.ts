import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordsService } from '../medical-records.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './record-list.component.html',
  styles: []
})
export class RecordsListComponent implements OnInit {
  imageList!: any[];
  rowIndexArray!: any[];

  userId?:string;

  constructor(private service: RecordsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.service.getImageDetailList(this.userId);
    this.service.imageDetailList.snapshotChanges().subscribe(
      list => {
        
        this.imageList = list.map(item => { return item.payload.val(); });
        this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length) / 3)).keys());
        console.log(this.imageList)
        console.log(this.rowIndexArray)
      }
    );
  }

}