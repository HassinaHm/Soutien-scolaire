import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Removed FormControl import
import { Professeur } from '../../models/professeur';
import { ProfesseurService } from '../../services/professeur.service';

@Component({
  selector: 'app-add-prof',
  templateUrl: './add-prof.component.html',
  styleUrls: ['./add-prof.component.css']
})
export class AddProfComponent {
  professeurForm!: FormGroup;
  professeur: Professeur[] = [];
  modalRef!: NgbModalRef;
  closeResult = '';
  selectedImageFile: File | undefined;

  @ViewChild('content') content!: TemplateRef<any>;

  constructor(
    private modalService: NgbModal,
    private professeurService: ProfesseurService,
    private fb: FormBuilder,
  ) {
    this.initForm();
  }

  initForm() {
    this.professeurForm = this.fb.group({
      nom: ['', Validators.required], // Using FormBuilder.group to initialize form controls
      prenom: ['', Validators.required],
      numberTel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tarifh: ['', Validators.required],
      imageUrl: [''],
      cv: [''] // Removed imageUrl form control
    });
  }
  saveProfesseur() {
    if (!this.selectedImageFile) {
      console.error('No image selected');
      return;
    }
  
    if (!this.professeurForm.valid) {
      console.error('Form is invalid');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', this.selectedImageFile, this.selectedImageFile.name);
  
    this.professeurService.uploadImage(formData).then(
      (imageUrl: string | undefined) => {
        if (imageUrl) {
          this.professeurForm.patchValue({ imageUrl }); 
  
          this.professeurService.saveProf(this.professeurForm.value).subscribe(
            (response) => {
              console.log('Professeur added successfully:', response);
              this.closeModal();
              window.location.reload();
            },
            (error) => {
              console.error('Error adding Professeur:', error);
            }
          );
        } else {
          console.error('Failed to upload image');
        }
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

  onImageSelected(event: any) {
    this.selectedImageFile = event.target.files[0];
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
