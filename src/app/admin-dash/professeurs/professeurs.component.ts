import { Component ,ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  displayedColumns: string[] = ['nom', 'prenom', 'numberTel', 'email', 'tarifh', 'imageUrl','actions'];
  dataSource = new MatTableDataSource<Professeur>();
  id: string | undefined;
  professeur : Professeur[] = [];
  editedProf: Professeur | null = null;
  selectedImage!: File;

  @ViewChild('editTestModal') editTestModal: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private professeurService: ProfesseurService,
    private dialog: MatDialog,
    private modalService: NgbModal,
  ) {}

  
  ngOnInit(): void {
    console.log('ngOnInit() called');
    this.dataSource.paginator = this.paginator;
    this.loadProfesseurs();
  }

  loadProfesseurs(): void {
    console.log('Loading professeurs...');
    this.professeurService.getAll().subscribe(
      professeurs => {
        console.log('Professeurs loaded:', professeurs);
        this.dataSource.data = professeurs;
      },
      error => console.error('Error loading professeurs', error)
    );
  }

 async saveProfChanges(): Promise<void> {
  if (this.editedProf && this.selectedImage) {
    try {
      const formData = new FormData();
      formData.append('nom', this.editedProf.nom);
      formData.append('prenom', this.editedProf.prenom);
      formData.append('email', this.editedProf.email);
      formData.append('tarifh', this.editedProf.tarifh.toString()); 
      formData.append('cv', this.editedProf.cv); // Add cv
      formData.append('file', this.selectedImage, this.selectedImage.name);
            
      const imageUrl = await this.professeurService.uploadImage(formData);
  
      if (imageUrl) {
        this.editedProf.imageUrl = imageUrl!;
      }
  
      const profId = this.editedProf.id;
      this.professeurService.updateProf(profId, this.editedProf).subscribe(
        (updatedProf: Professeur) => {
          const index = this.professeur.findIndex(p => p.id === updatedProf.id);
          if (index !== -1) {
            this.professeur[index] = updatedProf;
          }
          this.modalService.dismissAll();
        },
        (error) => {
          console.error('Error saving prof changes:', error);
        }
      );
    } catch (error) {
      console.error('Error uploading image and saving prof changes:', error);
    }
  } else {
    console.error('Form is invalid or no image selected');
  }
}

  
  
  getImageUrl(imageName: string): string {
    return this.professeurService.getImageUrl(imageName);
  }


  editProf(profId: number): void {
    this.professeurService.getProfById(profId).subscribe(
      (prof: Professeur) => {
        this.editedProf = { ...prof }; 
        this.openEditTestModal(this.editTestModal);
      },
      (error) => {
        console.error(`Error fetching prof with ID ${profId}:`, error);
      }
    );
  }
  

openEditTestModal(content: any): void {
  this.modalService.open(content, { centered: true });
}

deleteProf(prof: Professeur): void {
  if (confirm('Are you sure you want to delete this test?')) {
    this.professeurService.deleteProf(prof.id).subscribe(
      () => {
        this.professeur = this.professeur.filter((t) => t.id !== prof.id);
      },
      (error) => {
        console.error('Error deleting test:', error);
      }
    );
    window.location.reload();

  }
}


onImageSelected(event: any) {
  this.selectedImage = event.target.files[0];
}



}
