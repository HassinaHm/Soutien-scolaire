import { Component, OnInit } from '@angular/core';
import { Test } from '../models/test';
import { TestService } from '../../services/test.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css']
})
export class AddTestComponent implements OnInit {
  testForm!: FormGroup;
  selectedImage!: File;
  imageUrl!: string;
  newTest!: Test;

  
  constructor(private fb: FormBuilder, private testService: TestService) {}

  ngOnInit(): void {
    this.testForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      image: [null]
      });
  }

 
addTest(): void {
  if (this.testForm.valid && this.selectedImage) {
    const formData = new FormData();
    formData.append('file', this.selectedImage);
    const headers = new HttpHeaders().set('Authorization', 'Bearer your-token');

    this.testService.uploadImage(formData)
      .then(imageUrl => {
        const newTest = this.testForm.value;
        newTest.image = imageUrl;

        this.testService.saveTest(newTest)
          .subscribe(
            createdTest => {
              console.log('Test added successfully:', createdTest);
              // Reset the form after successful submission
              this.testForm.reset();
              // Store the image URL for display
              this.imageUrl = createdTest.image;
            },
            error => console.error('Error adding test:', error)
          );
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  } else {
    console.error('Form is invalid or no image selected');
  }
}
  
  
  // Function to handle file input change
  handleImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    } else {
      console.error('No image selected');
    }
  }

  
}
