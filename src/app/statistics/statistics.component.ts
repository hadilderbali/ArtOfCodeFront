import { Component, OnInit } from '@angular/core';
import { StatistiqueService } from '../statistique.service';
import Chart from 'chart.js/auto'; // Importez Chart.js
import { User } from '../user';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  totalCompetitions!: number;
  totalCandidacies!: number;
  averageGrade!: number;

  constructor(private statisticService: StatistiqueService) { }

  ngOnInit(): void {
    this.statisticService.getTotalCompetitions().subscribe(data => {
      this.totalCompetitions = data;
      this.createCompetitionsChart(); // Créer le graphique des compétitions
    });
  
    this.statisticService.getTotalCandidacies().subscribe(data => {
      this.totalCandidacies = data;
      this.createCandidaciesChart(); // Créer le graphique des candidatures
    });
  
    this.statisticService.getAverageGrade().subscribe(data => {
      this.averageGrade = data;
      this.createPieChart(); // Créer le graphique en secteurs
      this.createHorizontalBarChart(); // Créer le graphique à barres horizontales
      this.createLineChart(); // Créer le graphique en ligne
     });
  }
  
  createCompetitionsChart() {
    const ctx = document.getElementById('competitionsChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Total Competitions'],
          datasets: [{
            label: 'Total Competitions',
            data: [this.totalCompetitions],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
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
      });
    }
  }

  createCandidaciesChart() {
    const ctx = document.getElementById('candidaciesChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Total Candidacies'],
          datasets: [{
            label: 'Total Candidacies',
            data: [this.totalCandidacies],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
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
      });
    }
  }

  createPieChart() {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Total Competitions', 'Total Candidacies', 'Average Grade'],
          datasets: [{
            label: 'Statistics',
            data: [this.totalCompetitions, this.totalCandidacies, this.averageGrade],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
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
      });
    }
  }

  createHorizontalBarChart() {
    const ctx = document.getElementById('horizontalBarChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Total Competitions', 'Total Candidacies', 'Average Grade'],
          datasets: [{
            label: 'Statistics',
            data: [this.totalCompetitions, this.totalCandidacies, this.averageGrade],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            x: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  createLineChart() {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['1', '2', '3', '4'],
          datasets: [{
            label: 'Total Candidacies',
            data: [this.totalCandidacies],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
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
      });
    }
  }
  
 
}
