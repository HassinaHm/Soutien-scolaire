import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Etudiant } from '../../models/etudiant'; 
import { EtudiantService } from '../../services/etudiant.service';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css']
})
export class EtudiantsComponent {
  displayedColumns: string[] = ['nom', 'prenom', 'email', 'actions'];
  dataSource = new MatTableDataSource<Etudiant>();
  etudiants: Etudiant[] = [];
  editedEtudiant: Etudiant | null = null;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private etudiantService: EtudiantService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadEtudiants();
  }

  loadEtudiants(): void {
    this.etudiantService.getAll().subscribe(
      etudiants => {
        this.etudiants = etudiants;
        this.dataSource.data = etudiants;
      },
      error => console.error('Error loading étudiants', error)
    );
  }

  async saveEtudiantChanges(): Promise<void> {
    if (this.editedEtudiant) {
      try {
        const etudiantId = this.editedEtudiant.id;
        this.etudiantService.updateEtud(etudiantId, this.editedEtudiant).subscribe(
          (updatedEtudiant: Etudiant) => {
            const index = this.etudiants.findIndex(e => e.id === updatedEtudiant.id);
            if (index !== -1) {
              this.etudiants[index] = updatedEtudiant;
            }
            this.modalService.dismissAll();
          },
          (error) => {
            console.error('Error saving etudiant changes:', error);
          }
        );
      } catch (error) {
        console.error('Error saving etudiant changes:', error);
      }
    } else {
      console.error('No etudiant data to save');
    }
  }
  
  editProf(profId: number): void {
    this.etudiantService.getEtudbyId(profId).subscribe(
      (etud: Etudiant) => {
        this.editedEtudiant = { ...etud }; 
        this.openEditTestModal(this.editedEtudiant);
      },
      (error) => {
        console.error(`Error fetching prof with ID ${profId}:`, error);
      }
    );
  }
  

openEditTestModal(content: any): void {
  this.modalService.open(content, { centered: true });
}


  deleteEtudiant(etudiant: Etudiant): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.etudiantService.deleteEtud(etudiant.id).subscribe(
        () => {
          this.etudiants = this.etudiants.filter(e => e.id !== etudiant.id);
          this.dataSource.data = this.etudiants;
        },
        error => console.error('Error deleting student:', error)
      );
    }
  }
}
