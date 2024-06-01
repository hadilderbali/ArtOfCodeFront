import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Level } from 'src/app/models/level';
import { ReclamationCompetition } from 'src/app/models/reclamationCompetition';
import { ReclamationCompetitionService } from 'src/app/services/reclamationCompetition.service';
import { TutorialService } from 'src/app/services/tutorial.service';
import { Chart, ChartType, ChartTypeRegistry } from 'chart.js/auto';


@Component({
  selector: 'app-statistics-reclamation',
  templateUrl: './statistics-reclamation.component.html',
  styleUrls: ['./statistics-reclamation.component.css']
})
export class StatisticsReclamationComponent implements OnInit {
  sentimentStatistics: any; // Stockez les statistiques de sentiment ici
  statistics!: Level[];
  constructor(private reclamationService: ReclamationCompetitionService,public router: Router,private tutorialService: TutorialService){
   
  }
  ngOnInit(): void {
    this.loadSentimentStatistics();
    this.loadLevelStatistics();
   
   
   
  }
  generateSentimentChart(statistics: any): void {
    const canvas: any = document.getElementById('sentimentPieChart');
    const ctx = canvas.getContext('2d');
  
    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(statistics),
        datasets: [{
          label: 'Sentiment Statistics',
          data: Object.values(statistics),
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)', // Neutral
            'rgba(255, 99, 132, 0.2)',  // Negative
            'rgba(255, 205, 86, 0.2)',  // Positive
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 205, 86, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Statistiques de sentiment',
          }
        }
      }
    });
  }
  
  generateSentimentLineChart(statistics: any): void {
    const canvas: any = document.getElementById('sentimentLineChart');
    const ctx = canvas.getContext('2d');

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(statistics),
        datasets: [{
          label: 'Sentiment Statistics',
          data: Object.values(statistics),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Line Chart - Sentiment Statistics',
          }
        }
      }
    });
  }
  
  
  loadSentimentStatistics(): void {
    this.reclamationService.getSentimentStatistics().subscribe(
      (statistics) => {
        this.sentimentStatistics = statistics;
        this.generateSentimentChart(statistics);
        this.generateSentimentLineChart(statistics); // Appel pour le graphique en courbe
       
      },
      (error) => {
        console.error('Error fetching sentiment statistics:', error);
      }
    );
  }

 
  levelStatistics: any; // Stockez les statistiques de niveau ici
  loadLevelStatistics(): void {
    this.tutorialService.getStatisticsByLevel().subscribe(
      (statistics) => {
        this.levelStatistics = statistics;
        this.generateLevelVerticalBarChart(statistics); // Appel pour le graphique en barres horizontales
      },
      (error) => {
        console.error('Error fetching level statistics:', error);
      }
    );
  }

  generateLevelVerticalBarChart(statistics: any): void {
    const canvas: any = document.getElementById('levelVerticalBarChart');
    const ctx = canvas.getContext('2d');
  
    const chart = new Chart(ctx, {
      type: 'bar' as keyof ChartTypeRegistry,
      data: {
        labels: Object.keys(statistics),
        datasets: [{
          label: 'Level Statistics',
          data: Object.values(statistics),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',  // Couleur pour le niveau "Facile"
            'rgba(54, 162, 235, 0.2)',   // Couleur pour le niveau "Moyen"
            'rgba(255, 205, 86, 0.2)',   // Couleur pour le niveau "Difficile"
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 205, 86, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Level Statistics - Vertical Bar Chart',
          }
        }
      }
    });
  }



  
  

  }
