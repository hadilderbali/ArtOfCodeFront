import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TestService } from './Services/test.service';
import { message } from './Models/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  url4='http://localhost:8089/user/chat';
  addmessage='http://localhost:8089/user/add';
  socket!: WebSocket;
  constructor( private http:HttpClient,private articleService :TestService ) {
     
   }
   private headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
ngOnInit(): void {
  
      //this.http.post.(`${this.url4}`)
      this.socket = new WebSocket('ws://localhost:8089/user/chat');

      this.socket.onopen = (event) => {
        console.log('WebSocket opened:', event);
      };
this.msg={
id:null,
contenu :null,
receiver:null,
sender:null,
dateEnvoi:null
      }
    // this.affnubcours();
    // this.affcontenu();
     this.affcontenu2();
     //this.getAllcours();
     //this.affnubcour();
}
msg!:message;
addReponce(m:any){
  
 // this.articleService.addmessages(this.msg).subscribe(()=>{
 //  console.log(message);
//   this. affnubcour();
 //});
   
 
 }
 id :any;
 listcour:any;
 getAllcours(){
    
  this.articleService.getAllQcms().subscribe(res => {
    this.listcour = res ;
  });
}
getcours(){
    
  this.articleService.getAllQcms().subscribe(res => {
    this.listcour = res ;
  });
}
contenulast!:any;

    affnubcours(){
      this.articleService.getmessags().subscribe(data=>{
       this.contenulast = data ;
      });
    }

    contain!:string;
    affcontenu(){
      this.articleService.getDernierNom().subscribe(data=>{
        this.contain = data ;
        console.log(data);
       });
    }
    contain2!:any;
     senderId = 1; // Remplacez par l'ID de l'expéditeur
     receiverId = 2;
    affcontenu2(){
     
      this.articleService.getDernierNom2(this.senderId,this.receiverId).subscribe(data=>{
        this.contain2 = data ;
        console.log(data);
       });
    }
    message:any;
  //  affnubcour(){
    //  this.articleService.getmessage().subscribe(data=>{
      //this.message = data ;
     // console.log(this.message);
   //   });
   // }
}