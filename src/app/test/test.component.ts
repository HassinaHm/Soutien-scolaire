import { Component, OnInit } from '@angular/core';
import { Test } from '../models/test';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  tests: Test[] = [];

  constructor(private testService: TestService) {}

  ngOnInit(): void {
    this.loadTests();
  }

  loadTests(): void {
    this.testService.getAllTests().subscribe(
      tests => this.tests = tests,
      error => console.error('Error loading tests', error)
    );
  }

  getImageUrl(imageName: string): string {
    return this.testService.getImageUrl(imageName);
  }



}
