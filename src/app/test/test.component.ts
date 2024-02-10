import { Component, OnInit, ViewChild } from '@angular/core';
import { Test } from '../models/test';
import { TestService } from '../../services/test.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  tests: Test[] = [];
  editedTest: Test | null = null;
  testForm!: FormGroup;
  selectedImage!: File;

  @ViewChild('editTestModal') editTestModal: any;

  constructor(private modalService: NgbModal, private testService: TestService,
    private fb: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.loadTests();
    this.testForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      image: ['']
    });
  }

  async saveTestChanges(): Promise<void> {
    if (this.editedTest && this.selectedImage) {
      try {
        const formData = new FormData();
        formData.append('nom', this.editedTest.nom);
        formData.append('prenom', this.editedTest.prenom);
        formData.append('email', this.editedTest.email);
    
        formData.append('file', this.selectedImage, this.selectedImage.name);
              
        const imageUrl = await this.testService.uploadImage(formData);
    
        if (imageUrl) {
          this.editedTest.image = imageUrl!;
        }
    
        const testId = this.editedTest.id;
        this.testService.updateTest(testId, this.editedTest).subscribe(
          (updatedTest: Test) => {
            const index = this.tests.findIndex(t => t.id === updatedTest.id);
            if (index !== -1) {
              this.tests[index] = updatedTest;
            }
            this.modalService.dismissAll();
          },
          (error) => {
            console.error('Error saving test changes:', error);
          }
        );
      } catch (error) {
        console.error('Error uploading image and saving test changes:', error);
      }
    } else {
      console.error('Form is invalid or no image selected');
    }
  }

  onImageSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    } else {
      console.error('No image selected');
    }
  }

  loadTests(): void {
    this.testService.getAllTests().subscribe(
      tests => this.tests = tests,
      error => console.error('Error loading tests', error)
    );
  }

  editTest(testId: number): void {
    const test = this.tests.find(t => t.id === testId);
    if (test) {
      this.editedTest = test;
      this.openEditTestModal(this.editTestModal);
    } else {
      console.error(`Test with ID ${testId} not found.`);
    }
  }

  deleteTest(test: Test): void {
    if (confirm('Are you sure you want to delete this test?')) {
      this.testService.deleteTest(test.id).subscribe(
        () => {
          this.tests = this.tests.filter((t) => t.id !== test.id);
        },
        (error) => {
          console.error('Error deleting test:', error);
        }
      );
    }
  }

  getImageUrl(imageName: string): string {
    return this.testService.getImageUrl(imageName);
  }

  openEditTestModal(content: any): void {
    this.modalService.open(content, { centered: true });
  }
}
