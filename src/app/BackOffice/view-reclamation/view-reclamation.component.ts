import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { ReclamationCompetition } from 'src/app/models/reclamationCompetition';
import { ReclamationCompetitionService } from 'src/app/services/reclamationCompetition.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Chart from 'chart.js/auto';
import { WebSocketService } from 'src/app/services/WebSocketService';

import { jsPDF } from 'jspdf';





@Component({
  selector: 'app-view-reclamation',
  templateUrl: './view-reclamation.component.html',
  styleUrls: ['./view-reclamation.component.css']
})
export class ViewReclamationComponent {
  eventList: ReclamationCompetition[] = [];
  currentPage: number = 1;
  totalEvents: number = 0;
  pageSize: number = 3;
  totalPages: number = 0;
  pages: number[] = [];
  categories!: any[];
  sentimentStatistics: any; // Stockez les statistiques de sentiment ici
  
  reclamations: ReclamationCompetition[] = [];
  searchText:any;

  category: string = '';
  decision: string = ''; // Variable pour stocker les recommandations
 
selectedDateCreation: any;
p: number=1;
  

reclamationForm!: FormGroup;

  constructor(private reclamationService: ReclamationCompetitionService,public router: Router){
   
  }
  editingReclamation: any;

cancelEdit() {
this.reclamationForm.reset();
}
 
  reclamationStatus:String[]=['PENDING ','IN_PROGRESS','RESOLVED'];

  
  
  
  ngOnInit(): void {
  
  
  // Autres initialisations ou chargements de données
  this.loadReclamations();
  this.loadSentimentStatistics();
 
  }
  
  
  loadReclamations(): void {
    this.reclamationService.getAllReclamations().subscribe(
      (reclamations: ReclamationCompetition[]) => {
        this.reclamations = reclamations;
      
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching reclamations:', error);
      }
    );
  }
  

 
  private getReclamations(){
    this.reclamationService.getAllReclamations().subscribe(data => {
      this.reclamations=data;
  
    })
  }
  
  

  deleteReclamation(id: number): void {
    // Afficher une boîte de dialogue de confirmation
    const confirmDelete = window.confirm('Are you sure you want to delete this reclamation?');
  
    // Si l'utilisateur confirme, procéder à la suppression
    if (confirmDelete) {
      this.reclamationService.deleteRdeleteReclamationCompetition(id).subscribe(
        response => {
          console.log('success, deleteReclamation', response);
          this.loadReclamations();
        },
        error => console.error('error, deleteReclamation', error)
      );
    }

  
  }

  update(id: number) {
    
    this.router.navigate(['/admin/update-reclamation', id]); 

  }

  generateSentimentChart(statistics: any): void {
    const canvas: any = document.getElementById('sentimentPieChart');
    const ctx = canvas.getContext('2d'); // L'erreur se produit probablement ici

  
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
  
  
  
  loadSentimentStatistics(): void {
    this.reclamationService.getSentimentStatistics().subscribe(
      (statistics) => {
        this.sentimentStatistics = statistics;
        this.generateSentimentChart(statistics);
      },
      (error) => {
        console.error('Error fetching sentiment statistics:', error);
      }
    );
  }
  
  exportToCSV(): void {
    this.reclamationService.exportComplaintsToCSV().subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'complaints.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }

 
  generatePDF(): void {
    const doc = new jsPDF();

    // En-tête du PDF
    doc.text('Liste des réclamations', 10, 10);

    // Contenu de la liste des réclamations
    let posY = 20;
    this.reclamations.forEach((reclamation, index) => {
      const text = `${index + 1}. Type: ${reclamation.type}, Description: ${reclamation.description}, Sentiment: ${reclamation.sentiment}, Date: ${reclamation.dateCreation}`;
      doc.text(text, 10, posY);
      posY += 10;
    });

    // Enregistrement du fichier PDF
    doc.save('reclamations.pdf');
}



}
