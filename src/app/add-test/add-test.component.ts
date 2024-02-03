import { Component, OnInit } from '@angular/core';
import { Test } from '../models/test';
import { TestService } from '../../services/test.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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


  constructor(private fb: FormBuilder, private testService: TestService,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.testForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      image: ['']
    });
  }
  
  async addTest(): Promise<void> {
    if (this.testForm.valid && this.selectedImage) {
      const formData = new FormData();
  
      // Append form fields and file to formData
      formData.append('nom', this.testForm.get('nom')!.value);
      formData.append('prenom', this.testForm.get('prenom')!.value);
      formData.append('email', this.testForm.get('email')!.value);
      formData.append('file', this.selectedImage);
  
      try {
        const uploadUrl = 'http://localhost:8080/api/tests';
        
        // Set headers to specify Content-Type as multipart/form-data
        const headers = new HttpHeaders().set('Authorization', 'Bearer your-token');
  
        const imageUrl = await this.httpClient.post(uploadUrl, formData, { headers }).toPromise();
        console.log('Image uploaded successfully:', imageUrl);
  
        // Reset the form after successful submission
        this.testForm.reset();
      } catch (error) {
        console.error('Error uploading image:', error);
      }
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
