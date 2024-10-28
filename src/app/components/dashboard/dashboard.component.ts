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

  chart : any =[];
  chartPie : any =[];
  chartBar : any =[];
  chartPolarArea : any =[];


  result :any ; 
  segmentLine : any ;
  notationDateLine : any;

  clientsScore : ClientScore[]=[];


  constructor(private clientNotationService: ClientNotationService, private route: ActivatedRoute, 
    private router: Router ) { 
    Chart.register(...registerables)
  }
  
  
  ngOnInit(): void {
    this.clientNotationService.calculNbrPersonneScorParSegment().subscribe(
      res=>{
        this.clientsScore=res;
    },
      err=>{console.log(err);
      }
    );

    this.clientNotationService.getAllClientNotation().subscribe(res=>{
      this.result  =res;
      this.segmentLine = this.result.map((tttt : any )=> tttt.notationDate)
      this.notationDateLine= this.result.map((tttt : any )=> tttt.notationDate)
      //show line chart data
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.segmentLine,
          datasets: [
            {
              data: this.notationDateLine,
              borderColor: (ctx) => {
                const index = ctx.dataIndex;
                const colors = [
                  'rgb(255,99,132)',
                  'rgb(255,159,64)',
                  'rgb(255,205,86)',
                  'rgb(75,192,192)',
                  'rgb(54,162,235)',
                  'rgb(153,102,255)',
                  'rgb(201,203,207)',
                ];
                return colors[index % colors.length]; // Cycle à travers les couleurs
              },
              fill: false,
              label: 'Nombre de congés',
              backgroundColor: 'rgba(75,192,192,0.2)', // Couleur de fond si nécessaire
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
              text: 'Nombre des personnes scorées par date',
              color:'rgb(255, 99, 132)',
              font: {
                size: 14
              }
            }
          }
        }
      })
    });

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

    this.clientNotationService.getAllClientNotation().subscribe(res=>{
      this.result  =res;
      this.segmentLine = this.result.map((tttt : any )=> tttt.notationDate)
      this.notationDateLine= this.result.map((tttt : any )=> tttt.notationDate)
      //show line chart data
      this.chartPie = new Chart('Pie', {
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
