import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../medical-records.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './record-list.component.html',
  styles: []
})
export class RecordsListComponent implements OnInit {
  imageList!: any[];
  rowIndexArray!: any[];

  constructor(private service: RecordsService) { }

  ngOnInit() {
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