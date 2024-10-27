import { Component, OnInit } from '@angular/core';
import { ClientNotation } from '../../classes/client-notation';
import { ClientNotationService } from '../../services/client-notation.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  clients: any[] = []; // Contiendra les informations sur les clients
  constructor(private clientService: ClientNotationService) { }
  ngOnInit(): void {
    this.getClients();
    this.renderChart();
  }
  renderChart() {
    /*const ctx = document.getElementById('myChart') as HTMLCanvasElement; // 'myChart' doit correspondre
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Monthly Sales',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });*/
  }
  
  getClients() {
    this.clientService.getAllClientNotation().subscribe(
      (data: any[]) => {
        this.clients = data; // Assurez-vous que le service retourne la liste des clients avec leurs scores
      },
      (error) => {
        console.error('Erreur lors du chargement des clients', error);
      }
    );
  }
  viewDetails(client: any) {
    // Logique pour afficher plus de détails ou rediriger vers une page spécifique
    console.log('Détails du client', client);
  }
}
