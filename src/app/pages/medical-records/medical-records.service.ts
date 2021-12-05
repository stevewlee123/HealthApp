

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {


  constructor(private firebase: AngularFireDatabase) { }

  imageDetailList!: AngularFireList<any>;

  getImageDetailList(name) {
    this.imageDetailList = this.firebase.list(name);
  }

  insertImageDetails(name, imageDetails) {
    const itemsRef = this.firebase.list(name);
    itemsRef.push(imageDetails);
  }
}