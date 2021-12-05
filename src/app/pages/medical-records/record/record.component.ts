import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from "rxjs/operators";
import { RecordsService } from "../medical-records.service"
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-image',
  templateUrl: './record.component.html',
  styles: []
})
export class RecordsComponent implements OnInit {
  imgSrc!: string;
  selectedImage: any = null;
  isSubmitted!: boolean;
  userId?: string;

  formTemplate = new FormGroup({
    caption: new FormControl('', Validators.required),
    category: new FormControl(''),
    imageUrl: new FormControl('', Validators.required)
  })

  constructor(
    private storage: AngularFireStorage, 
    private service: RecordsService,
    private route: ActivatedRoute
    ){}

  ngOnInit() {
    this.resetForm();
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    console.log(this.userId );
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = '/assets/img/image_placeholder.jpg';
      this.selectedImage = null;
    }
  }

  onSubmit(formValue) {
    formValue["category"] = this.userId;
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      var filePath = `${formValue.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      console.log(filePath);
      console.log(formValue);
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            
            console.log(url);
            console.log(formValue);
            this.service.insertImageDetails(this.userId, formValue);
            this.resetForm();
          })
        })
      ).subscribe();
    }
  }

  get formControls() {
    return this.formTemplate['controls'];
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      caption: '',
      imageUrl: '',
      category: 'prescription'
    });
    this.imgSrc = '/assets/img/image_placeholder.jpg';
    this.selectedImage = null;
    this.isSubmitted = false;
  }

}