import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatiereService } from '../services/matiere.service';
import { Matiere } from '../models/matiere';
import { Professeur } from '../models/professeur';

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrl: './matieres.component.css'
})
export class MatieresComponent {
  @Input() matieres: Matiere[] = [];
  @Output() changePage = new EventEmitter<number>();
  @Output() professeursLoaded = new EventEmitter<Professeur[]>();
  selectedMatiere: Matiere | null = null;
  professors: Professeur[] = [];
  
  currentPage = 1;
  pageSize = 4;
  pagedMatieres: Matiere[] = [];
  constructor(private matiereService: MatiereService) { }

  ngOnInit(): void {
    this.loadMatieres();
  }

  loadMatieres(): void {
    this.matiereService.getAll().subscribe(
      matieres => {
        this.matieres = matieres;
        this.setPage(this.currentPage);

      },
      error => console.error('Error loading professeurs', error)
    );
  }

  onMatiereClick(matiere: Matiere): void {
    this.selectedMatiere = matiere;
    this.loadProfessorsByMatiere(matiere);
  }

  loadProfessorsByMatiere(matiere: Matiere): void {
    this.matiereService.getProfesseursByMatiere(matiere.nom).subscribe(
      professors => {
        this.professors = professors;
      },
      error => console.error('Error loading professors by matiere', error)
    );
  }

  // getprofessor(matiere: string): void {
  //   this.matiereService.getProfesseursByMatiere(matiere).subscribe(
  //     professeurs => {
  //       this.professeursLoaded.emit(professeurs); 
  //     },
  //     error => console.error('Error loading professeurs by matiere', error)
  //   );
  // }


  get pages(): number[] {
    const totalPages = Math.ceil(this.matieres.length / this.pageSize);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.matieres.length);
    this.pagedMatieres = this.matieres.slice(startIndex, endIndex);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.matieres.length / this.pageSize);
    if (this.currentPage < totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }
}
