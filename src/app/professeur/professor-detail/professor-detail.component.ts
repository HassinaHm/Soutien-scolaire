import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfesseurService } from '../../services/professeur.service';
import { Professeur } from '../../models/professeur';

@Component({
  selector: 'app-professor-detail',
  templateUrl: './professor-detail.component.html',
  styleUrls: ['./professor-detail.component.css']
})
export class ProfessorDetailComponent implements OnInit {
  profs: Professeur| null = null;;

  constructor(private route: ActivatedRoute, private professeurService: ProfesseurService) { }

  ngOnInit(): void {
    this.loadProfesseur();
  }
  
  loadProfesseur(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;

    this.professeurService.getProfById(id).subscribe(
      profs => {
        this.profs = profs;
      },
      error => console.error('Error loading professor', error)
    );
  }
}
