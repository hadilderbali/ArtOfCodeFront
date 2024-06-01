import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-all-template-front',
  templateUrl: './all-template-front.component.html',
  styleUrls: ['./all-template-front.component.css']
})
export class AllTemplateFrontComponent {
  ngOnInit(): void {
    console.log("token",localStorage.getItem("access_token"))
  }

}
