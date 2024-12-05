import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ScoringVariable } from '../classes/scoring-variable';
import { ActivatedRoute, Router } from '@angular/router';
import { ScoringVariableService } from '../services/scoring-variable.service';
import { NgToastService } from 'ng-angular-popup';
import { Segment } from '../classes/enum';

@Component({
  selector: 'app-variables-scoring',
  templateUrl: './variables-scoring.component.html',
  styleUrls: ['./variables-scoring.component.css']
})
export class VariablesScoringComponent implements OnInit {
  searchText: string = '';
  p: number = 1; // Page courante
  itemsPerPage: number = 50; // Nombre d'éléments par page
  scoringVariables: ScoringVariable[]=[];
  scoringVariable : ScoringVariable = new ScoringVariable;
  scoringForm: FormGroup;
  editScoringForm!: FormGroup;
  selectedScoringVariableId!: number;
  constructor(private fb: FormBuilder,private route: ActivatedRoute, 
    private router: Router, public scoringVariableService : ScoringVariableService,
    private toast : NgToastService  ) {
        this.scoringForm = this.fb.group({
          code: ['', Validators.required],
          description: ['', Validators.required],
          segment: ['PARTICULIERS', Validators.required],
          scoreVariables: this.fb.array([])
        });
      
  }
  // Getter pour accéder au FormArray
  get scoreVariables(): FormArray {
    return this.scoringForm.get('scoreVariables') as FormArray;
  }
  get editScoreVariables() {
    return this.editScoringForm.get('scoreVariables') as FormArray;
  }
  // Fonction pour ajouter une nouvelle ScoreVariable
  addScoreVariable() {
    const scoreVariableForm = this.fb.group({
      valeur: ['', Validators.required],
      score: [0, [Validators.required, Validators.min(0)]],
    });
    this.scoreVariables.push(scoreVariableForm);
  }
  // Fonction pour supprimer une ScoreVariable
  removeScoreVariable(index: number) {
    this.scoreVariables.removeAt(index);
  }
      // Soumettre le formulaire
  onSubmit() {
    if (this.scoringForm.valid) {
      const scoringVariable: ScoringVariable = this.scoringForm.value;
  
      console.log('Données soumises :', scoringVariable); // Debugging
      
      this.scoringVariableService.createNewScoringVariable(scoringVariable).subscribe(
        res => {
          this.toast.success(`Variable [${scoringVariable.code}] ajoutée avec succès`, 'Success');
          this.ngOnInit(); // Reinitialise le formulaire
          console.log('Réponse du serveur:', res);
        },
        err => {
          this.toast.danger('Problème de création');
          console.error('Erreur:', err);
        }
      );
    } else {
      console.log('Formulaire invalide');
    }
  }
      
  ngOnInit(): void {
    this.loadScoringVariables();
    this.scoringForm = this.fb.group({
      code: ['', Validators.required],
      description: ['', Validators.required],
      segment: ['', Validators.required],
      scoreVariables: this.fb.array([]), // Initialisation correcte
    });
    this.editScoringForm = this.fb.group({
      id: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
      segment: ['', Validators.required],
      scoreVariables: this.fb.array([])
    });
  }
  get segmentOptions() {
    return Object.values(Segment);
  }
  editScoringVariable(sv: any) {
    this.editScoringForm.patchValue({
      id:sv.id,
      code: sv.code,
      description: sv.description,
      segment:sv.segment
    });
    
    console.log("-------------"+this.editScoringForm.value.id);
    // Effacer les anciennes variables et ajouter les nouvelles
    this.editScoreVariables.clear();
    sv.scoreVariables.forEach((variable: any) => {
      this.editScoreVariables.push(this.fb.group({
        valeur: [variable.valeur, Validators.required],
        score: [variable.score, [Validators.required, Validators.min(0)]]
      }));
    });
  }

  addEditScoreVariable() {
    this.editScoreVariables.push(this.fb.group({
      valeur: ['', Validators.required],
      score: [0, [Validators.required, Validators.min(0)]]
    }));
  }
  
  removeEditScoreVariable(index: number) {
    this.editScoreVariables.removeAt(index);
  }
  
  onEditSubmit() {
    if (this.editScoringForm.valid) {
      console.log(""+this.editScoringForm.value.segment);
      const updatedScoringVariable = this.editScoringForm.value;
      this.scoringVariableService.editScoringVariable(updatedScoringVariable).subscribe(
        res => {
          this.toast.success('Scoring Variable updated successfully', 'Success');
          this.ngOnInit();
        },
        err => {
          this.toast.danger('Error while updating the Scoring Variable');
          console.error(err);
        }
      );
    }
  }
  
  // Charger toutes les ScoringVariables
  loadScoringVariables(): void {
    this.scoringVariableService.getAllScoringVariables().subscribe(
      (data) => {
        this.scoringVariables = data;
      },
      (error) => {
        console.error('Erreur de récupération des scoring variables:', error);
      }
    );
  }
  get filteredScoringVariables() {
    return this.scoringVariables.filter(sv => 
      (sv.code!=null ?sv.code.toLowerCase() :'').includes(this.searchText.toLowerCase()) || 
      sv.description.toLowerCase().includes(this.searchText.toLowerCase())||
      (sv.segment!=null ? sv.segment.toString().toLowerCase():'').includes(this.searchText.toLowerCase())
    );
  }

  /*editScoringVariable(scoringVariable : ScoringVariable){}*/
  openDeleteModal(selectedScoringVariableId : any){
    this.selectedScoringVariableId = selectedScoringVariableId;
  }
  confirmDelete(){
    this.scoringVariableService.deleteScoringVariable(this.selectedScoringVariableId).subscribe( 
      res=>{
        this.toast.success( "Variable  supprimée avec succès", "success " );
      // Fermez le modal de confirmation
      const modalElement = document.getElementById('confirmDeleteModal');
      /*if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }*/
        this.ngOnInit();
        console.log(res);

      }, 
    err=>{
      this.toast.danger("Problem de suppression",err);
      console.log(err);});
  }

}
