import { Component, OnInit } from '@angular/core';
import { ClientNotationService } from '../../../services/client-notation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientScore } from '../../../classes/ClientScore';

@Component({
  selector: 'app-clients-notes',
  templateUrl: './clients-notes.component.html',
  styleUrl: './clients-notes.component.css'
})
export class ClientsNotesComponent implements OnInit  {
  clientsNotations : any =[];
  clientsNotationsPP : any =[];
  clientsScore : ClientScore[]=[];
  constructor(private clientNotationService: ClientNotationService, private route: ActivatedRoute, 
    private router: Router ) { 
    
  }

  ngOnInit(): void {

    this.clientNotationService.findByNotationBySegmentCodeDateDesc("ENTREPRISE").subscribe(
      res=>{
        this.clientsNotations=res;
    },
      err=>{console.log(err);
      }
    );
    this.clientNotationService.findByNotationBySegmentCodeDateDesc("PARTICULIERS").subscribe(
      res=>{
        this.clientsNotationsPP=res;
    },
      err=>{console.log(err);
      }
    );
    this.clientNotationService.calculNbrPersonneScorParSegment().subscribe(
      res=>{
        this.clientsScore=res;
    },
      err=>{console.log(err);
      }
    );
  }
}
