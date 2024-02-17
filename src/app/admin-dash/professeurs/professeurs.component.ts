import { Component ,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Professeur } from '../../models/professeur';
import { ProfesseurService } from '../../services/professeur.service';

@Component({
  selector: 'app-professeurs',
  templateUrl: './professeurs.component.html',
  styleUrl: './professeurs.component.css'
})
export class ProfesseursComponent {
  displayedColumns: string[] = ['nom', 'prenom', 'numberTel', 'email', 'tarifh', 'imageUrl'];
  dataSource = new MatTableDataSource<Professeur>();
  id: string | undefined;
  professeur : Professeur[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private professeurService: ProfesseurService,
    private dialog: MatDialog,
  ) {}

  
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.loadProfesseurs();
  }

    loadProfesseurs(): void {
      this.professeurService.getAll().subscribe(
        professeur => {
          this.professeur = professeur;
        },
        error => console.error('Error loading professeurs', error)
      );
      
    }


editElement(){

}
deleteElement(){

}

  }
