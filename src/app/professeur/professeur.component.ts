import { Component , OnInit,EventEmitter, Input, Output  } from '@angular/core';
import { ProfesseurService } from '../services/professeur.service';
import { Professeur } from '../models/professeur';

@Component({
  selector: 'app-professeur',
  templateUrl: './professeur.component.html',
  styleUrls: ['./professeur.component.css']
})
export class ProfesseurComponent implements OnInit  {
  @Input() profs: Professeur[] = [];
  @Output() changePage = new EventEmitter<number>();

  currentPage = 1;
  pageSize = 4; // Number of items per page
  pagedProfs: Professeur[] = [];

  constructor(private professeurService: ProfesseurService,) { }

  ngOnInit(): void {
    this.loadProfesseurs();
  }
  
  loadProfesseurs(): void {
    this.professeurService.getAll().subscribe(
      profs => {
        this.profs = profs;
        this.setPage(this.currentPage); 
      },
      error => console.error('Error loading professeurs', error)
    );
    
  }

  getImageUrl(imageName: string): string {
    return this.professeurService.getImageUrl(imageName);
  }


  get pages(): number[] {
    const totalPages = Math.ceil(this.profs.length / this.pageSize);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.profs.length);
    this.pagedProfs = this.profs.slice(startIndex, endIndex);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.profs.length / this.pageSize);
    if (this.currentPage < totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }

}
