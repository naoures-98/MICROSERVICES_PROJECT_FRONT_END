import { Component, OnInit } from '@angular/core';
import { ClientNotation } from '../../classes/client-notation';
import { ClientNotationService } from '../../services/client-notation.service';
import { Chart ,registerables} from 'chart.js';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientScore } from '../../classes/ClientScore';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent implements OnInit{

  chartEntreprise : any =[];
  chartParticuliers : any =[];
  chartPieEntreprise : any =[];
  chartPieParticuliers : any =[];
  chartBar : any =[];
  chartPolarArea : any =[];

  clientsNotations : any =[];
  nbLine : any;
  result :any ; 
  segmentLine : any ;
  notationDateLine : any;

  clientsScore : ClientScore[]=[];

  bestPDSegmentEntreprise: string = "";
  bestPDSegmentParticuliers: string ="";
  scoredPersons: Array<{ name: string, score: number }> = [
    { name: 'Personne 1', score: 85 },
    { name: 'Personne 2', score: 92 },
    // Ajoutez plus de données si nécessaire
  ];
  // chart pie 
  decisionOctroi : any;
  //decisionOctroiP : any;
  nb: any;

  constructor(private clientNotationService: ClientNotationService, private route: ActivatedRoute, 
    private router: Router ) { 
    Chart.register(...registerables)
  }
  
  
  ngOnInit(): void {
    this.bestPDSegmentEntreprise = 'PD Entreprise Exemple';
    this.bestPDSegmentParticuliers = 'PD Particuliers Exemple';
    this.clientNotationService.findTop10ByOrderByNotationDateDesc().subscribe(
      res=>{
        this.clientsNotations=res;
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



        //////////////////////////////////////////////////////////////////////





    this.clientNotationService.calculNbrNiveauParSegment("PARTICULIERS").subscribe(res=>{
      this.result  =res;
      this.decisionOctroi = this.result.map((u : any )=> u.decisionOctroi)
      this.nb= this.result.map((u : any )=> u.nb)
      //show line chart data
      this.chartPieParticuliers = new Chart('Pie', {
        type: 'pie',
        data: {
          labels: this.decisionOctroi,
          datasets: [
            {
              data: this.nb,
              label: 'Decision',
              backgroundColor: [
                '#e67e22',
                '#bdc3c7',

                '#9b59b6',
                
              ],
              hoverBackgroundColor: ['#f2e2cb'],
              hoverBorderColor: ['#faf5ed'],
            },
          ],

        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Niveau Par segment Particuliers',
              color:'#000000',
              font: {
                size: 20
              }
            }
          }
        }
      })
    });



        //////////////////////////////////////////////////////////////////////





    this.clientNotationService.calculNbrNiveauParSegment("ENTREPRISE").subscribe(res=>{
      this.result  =res;
      this.decisionOctroi = this.result.map((u : any )=> u.decisionOctroi)
      this.nb= this.result.map((u : any )=> u.nb)
      //show line chart data
      this.chartPieEntreprise = new Chart('PieEntreprise', {
        type: 'pie',
        data: {
          labels: this.decisionOctroi,
          datasets: [
            {
              data: this.nb,
              label: 'Decision octroi',
              backgroundColor: [
                '#e67e22',
                '#bdc3c7',

                '#9b59b6',
                
              ],
              hoverBackgroundColor: ['#f2e2cb'],
              hoverBorderColor: ['#faf5ed'],
            },
          ],

        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Niveau Par segment Entreprise',
              color:'#000000',
              font: {
                size: 20
              }
            }
          }
        }
      })
    });




        //////////////////////////////////////////////////////////////////////






    this.clientNotationService.calculNbClientScoreParDate("ENTREPRISE").subscribe(res=>{
      this.result  =res;
      this.nbLine = this.result.map((tttt : any )=> tttt.nb)
      this.notationDateLine= this.result.map((tttt : any )=> tttt.notationDate)
      //show line chart data
      this.chartEntreprise = new Chart('canvasEntreprise', {
        type: 'bar',
        data: {
          labels: this.notationDateLine,
          datasets: [
            {
              data: this.nbLine,
              
              borderColor: (ctx) => {
                const index = ctx.dataIndex;
                const colors = [
                  '#d6a152',
                  '#806031',
                  '#403018',
                  '#e6c697',
                  '#df8e59',
                ];
                return colors[index % colors.length]; // Cycle à travers les couleurs
              },
              
              
              label: 'Nombre de personne morales scorées',
              backgroundColor: [
                '#34495e',
                '#f39c12',
                '#1abc9c',

                '#3498db',
                '#e74c3c',
                '#2ecc71',
                '#f1c40f',
                '#e67e22',
                '#bdc3c7',

                '#9b59b6',


                '#1abc9c',
                '#f39c12',
                '#34495e',
                
              ], // Couleur de fond si nécessaire
              borderWidth: 3,
              hoverBackgroundColor: ['#f2e2cb'],
              hoverBorderColor: ['#faf5ed'],
            },
          ],
          
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Nombre des personnes morales scorées par date',
              color:'#000000',
              font: {
                size: 20
              }
            }
          }
        }
      })
    });


        //////////////////////////////////////////////////////////////////////






    this.clientNotationService.calculNbClientScoreParDate("PARTICULIERS").subscribe(res=>{
      this.result  =res;
      this.nbLine = this.result.map((tttt : any )=> tttt.nb)
      this.notationDateLine= this.result.map((tttt : any )=> tttt.notationDate)
      //show line chart data
      this.chartParticuliers = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: this.notationDateLine,
          datasets: [
            {
              data: this.nbLine,
              
              borderColor: (ctx) => {
                const index = ctx.dataIndex;
                const colors = [
                  '#d6a152',
                  '#806031',
                  '#403018',
                  '#e6c697',
                  '#df8e59',
                ];
                return colors[index % colors.length]; // Cycle à travers les couleurs
              },
              
              label: 'Nombre de personnes physiques scorées',
              backgroundColor: [
                
                '#e74c3c',
                '#2ecc71',
                '#f1c40f',
                '#e67e22',
              ], // Couleur de fond si nécessaire
              borderWidth: 3,
              hoverBackgroundColor: ['#f2e2cb'],
              hoverBorderColor: ['#faf5ed'],
            },
          ],
          
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Nombre des personnes physiques scorées par date',
              color:'#000000',
              font: {
                size: 20
              }
            }
          }
        }
      })
    });


        //////////////////////////////////////////////////////////////////////





    this.clientNotationService.getAllClientNotation().subscribe(res=>{
      this.result  =res;
      this.segmentLine = this.result.map((tttt : any )=> tttt.notationDate)
      this.notationDateLine= this.result.map((tttt : any )=> tttt.notationDate)
      //show line chart data
      this.chartPolarArea = new Chart('PolarArea', {
        type: 'polarArea',
        data: {
          labels: this.notationDateLine,
          datasets: [
            {
              data: this.notationDateLine,
              borderColor:  [
                'rgb(255,99,132)',
                'rgb(255,159,64)',
                'rgb(255,205,86)',
                'rgb(75,192,192)',
                'rgb(54,162,235)',
                'rgb(153,102,255)',
                'rgb(201,203,207)'
              ],
              label: 'nombre par type',
              backgroundColor: [
                'rgb(255,99,132)',
                'rgb(255,159,64)',
                'rgb(255,205,86)',
                'rgb(75,192,192)',
                'rgb(54,162,235)',
                'rgb(153,102,255)',
                'rgb(201,203,207)'
              ],
              borderWidth: 3,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Les types de congés les plus courants',
              color:'rgb(255, 99, 132)',
              font: {
                size: 14
              }
            }
          }
        }
      })
    });


        //////////////////////////////////////////////////////////////////////





    this.clientNotationService.getAllClientNotation().subscribe(res=>{
      this.result  =res;
      this.segmentLine = this.result.map((tttt : any )=> tttt.notationDate)
      this.notationDateLine= this.result.map((tttt : any )=> tttt.notationDate)
      //show line chart data
      this.chartBar = new Chart('Bar', {
        type: 'bar',
        data: {
          labels: this.notationDateLine,
          datasets: [
            {
              data: this.notationDateLine,
              borderColor:  [
                'rgb(255,99,132)',
                'rgb(255,159,64)',
                'rgb(255,205,86)',
                'rgb(75,192,192)',
                'rgb(54,162,235)',
                'rgb(153,102,255)',
                'rgb(201,203,207)'
              ],
              label: 'Durée',
              backgroundColor: [
                'rgb(255,99,132)',
                'rgb(255,159,64)',
                'rgb(255,205,86)',
                'rgb(75,192,192)',
                'rgb(54,162,235)',
                'rgb(153,102,255)',
                'rgb(201,203,207)'
              ],
              borderWidth: 3,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Durée de congés validée par utilisateur les 3 derniers mois',
              color:'rgb(153,102,255)',

              font: {
                size: 14
              }
            }
          }
        }
      })
    });


    //////////////////////////////////////////////////////////////////////



    this.clientNotationService.getAllClientNotation().subscribe(res=>{
      this.result  =res;
      this.segmentLine = this.result.map((tttt : any )=> tttt.notationDate)
      this.notationDateLine= this.result.map((tttt : any )=> tttt.notationDate)
      //show line chart data
      this.chartPieEntreprise = new Chart('Pie', {
        type: 'pie',
        data: {
          labels: this.notationDateLine,
          datasets: [
            {
              data: this.notationDateLine,
              label: 'Durée',
              backgroundColor: [
                'rgb(255,99,132)',
                'rgb(255,159,64)',
                'rgb(255,205,86)',
                'rgb(75,192,192)',
                'rgb(54,162,235)',
                'rgb(153,102,255)',
                'rgb(201,203,207)'
              ],
            },
          ],

        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Durée de congés par Equipe pour les 3 derniers mois',
              color:'rgb(255, 205, 86)',
              font: {
                size: 25
              }
            }
          }
        }
      })
    });
  }


}
