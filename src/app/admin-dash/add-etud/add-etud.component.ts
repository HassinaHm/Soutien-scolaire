import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Etudiant } from '../../models/etudiant';
import { EtudiantService } from '../../services/etudiant.service';

@Component({
  selector: 'app-add-etud',
  templateUrl: './add-etud.component.html',
  styleUrls: ['./add-etud.component.css']
})
export class AddEtudComponent {
  etudiantForm!: FormGroup;
  etudiant: Etudiant[] = [];
  modalRef!: NgbModalRef;
  closeResult = '';

  @ViewChild('content') content!: TemplateRef<any>;

  constructor(
    private modalService: NgbModal,
    private etudiantService: EtudiantService,
    private fb: FormBuilder,
  ) {
    this.initForm();
  }

  initForm() {
    this.etudiantForm = this.fb.group({
      nom: ['', Validators.required], 
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  saveEtudiant() {
    if (!this.etudiantForm.valid) {
      console.error('Form is invalid');
      return;
    }

    this.etudiantService.saveEtud(this.etudiantForm.value).subscribe(
      (response) => {
        console.log('Etudiant added successfully:', response);
        this.closeModal();
        window.location.reload(); // Reloading the page to update the list of students
      },
      (error) => {
        console.error('Error adding Etudiant:', error);
      }
    );
  }
  
  open(content: TemplateRef<any>) {
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

    this.modalRef.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  closeModal() {
    this.modalRef.close();
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
