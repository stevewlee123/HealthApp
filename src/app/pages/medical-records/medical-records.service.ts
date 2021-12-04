

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {


  constructor(private firebase: AngularFireDatabase) { }

  imageDetailList!: AngularFireList<any>;

  getImageDetailList() {
    this.imageDetailList = this.firebase.list('imageDetails');
  }

  insertImageDetails(imageDetails) {
    this.imageDetailList.push(imageDetails);
  }
}