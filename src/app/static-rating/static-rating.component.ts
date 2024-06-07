import { Component, OnInit } from '@angular/core';
import Chart, { ChartOptions } from 'chart.js/auto';
import { BlogService } from '../Services/blog.service';
import { Rating } from '../Model/Rating';

@Component({
  selector: 'app-static-rating',
  templateUrl: './static-rating.component.html',
  styleUrls: ['./static-rating.component.css']
})
export class StaticRatingComponent implements OnInit { 
  ratingsData: any = {};
  highestLowestChart: Chart | null = null;
  ratingsChart: Chart | null = null;
  highestRatedBlogs: any;
  lowestRatedBlogs: any;
  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadRatingStatistics();
    this.loadHighestAndLowestRatedBlogs();
  }

  loadRatingStatistics(): void {
    this.blogService.getAverageRatingPerCategory().subscribe(data => {
      this.ratingsData.averageRatings = data;
      this.createRatingsChart();
    });

    this.blogService.getTotalNumberOfRatingsPerCategory().subscribe(data => {
      this.ratingsData.totalRatings = data;
      this.createRatingsChart();
    });
  }

  loadHighestAndLowestRatedBlogs(): void {
    this.blogService.getHighestRatedBlogPerCategory().subscribe(data => {
      this.highestRatedBlogs = data;
      this.createHighestLowestChart();
    });
  
    this.blogService.getLowestRatedBlogPerCategory().subscribe(data => {
      this.lowestRatedBlogs = data;
      this.createHighestLowestChart();
    });
  
  } 
  createHighestLowestChart(): void {
    if (!this.highestRatedBlogs || !this.lowestRatedBlogs) {
      return; // Wait until all data are available
    }
  
    const categories = Object.keys(this.highestRatedBlogs);
  
    // Extracting ratings from the objects
    const highestRatings = Object.values(this.highestRatedBlogs);
    const lowestRatings = Object.values(this.lowestRatedBlogs);
    if (this.highestLowestChart) {
      this.highestLowestChart.destroy();
    }

    const ctx = document.getElementById('highestLowestChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line', // Change chart type to line
      data: {
        labels: categories,
        datasets: [
          {
            label: 'Highest Ratings',
            data: highestRatings,
            fill: false, // Do not fill area under the line
            borderColor: 'rgba(54, 162, 235, 1)', // Blue color for highest ratings
            borderWidth: 2 // Increase line width for better visibility
          }
        ]
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
  
  createRatingsChart(): void {
    if (!this.ratingsData.averageRatings || !this.ratingsData.totalRatings) {
      return; // Wait until both sets of data are available
    }
    if (this.ratingsChart) {
      this.ratingsChart.destroy();
    }

    const categories = Object.keys(this.ratingsData.averageRatings);
    const averageRatings = Object.values(this.ratingsData.averageRatings);
    const totalRatings = Object.values(this.ratingsData.totalRatings);

    const ctx = document.getElementById('ratingsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: categories,
        datasets: [
          {
            label: 'Average Ratings',
            data: averageRatings,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Total Ratings',
            data: totalRatings,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
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