import { Component, OnInit, ViewChild } from '@angular/core';
import { Test } from '../models/test';
import { TestService } from '../../services/test.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  tests: Test[] = [];
  editedTest: Test | null = null;

  @ViewChild('editTestModal') editTestModal: any;

  constructor(private modalService: NgbModal, private testService: TestService) {}

  openEditTestModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  saveTestChanges(): void {
    if (this.editedTest) { // Null check
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
    }
  }

  onImageSelected(event: any): void {
    const file: File = event.target.files[0]; // Get the selected file
    if (file) {
      // If a file is selected
      const reader: FileReader = new FileReader(); // Create a new FileReader instance
      reader.onload = (e: any) => {
        // When the file is loaded
        // Access the image URL from 'e.target.result' and use it as needed
        const imageUrl: string = e.target.result;
        // You can now use this 'imageUrl' to display the selected image or perform any other logic
        console.log('Selected image URL:', imageUrl);
        // Perform further actions such as displaying the image or uploading it to a server
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  }
  

  ngOnInit(): void {
    this.loadTests();
  }

  loadTests(): void {
    this.testService.getAllTests().subscribe(
      tests => this.tests = tests,
      error => console.error('Error loading tests', error)
    );
  }

  editTest(test: Test): void {
    this.editedTest = test; 
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
}
