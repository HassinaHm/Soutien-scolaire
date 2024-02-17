import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from '../../src/app/models/test';  


@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiUrl = 'http://localhost:8081/api/tests';
  private imageUrl = 'http://localhost:8081/api/images';

  constructor(private httpClient: HttpClient) {}


  getAllTests(): Observable<Test[]> {
    return this.httpClient.get<Test[]>(this.apiUrl);
  }


  getTestById(id: number): Observable<Test> {
    return this.httpClient.get<Test>(`${this.apiUrl}/${id}`);
  }

  saveTest(test: Test): Observable<Test> {
    return this.httpClient.post<Test>(this.apiUrl, test);
  }

  async uploadImage(formData: FormData): Promise<string | undefined> {
    const uploadUrl = 'http://localhost:8080/api/images/upload';
    try {
      const imageUrl = await this.httpClient.post(uploadUrl, formData, { responseType: 'text' }).toPromise();
      return imageUrl as string;
    } catch (error) {
      console.error('Error uploading image:', error);
      return undefined;
    }
  }

  getImageUrl( imageName: string): string {
    return `${this.imageUrl}/${imageName}`;
  }
  
  
  updateTest(id: number, test: Test): Observable<Test> {
    return this.httpClient.put<Test>(`${this.apiUrl}/${id}`, test);
  }

  deleteTest(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
