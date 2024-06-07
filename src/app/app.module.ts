import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { SidebarBackComponent } from './BackOffice/sidebar-back/sidebar-back.component';
import { NavebarBackComponent } from './BackOffice/navebar-back/navebar-back.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { HeaderFrontComponent } from './FrontOffice/header-front/header-front.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { JobOfferListComponent } from './FrontOffice/job-offer-list/job-offer-list.component';

import{HttpClient, HttpClientModule} from "@angular/common/http";
import { CreateJobOfferComponent } from './FrontOffice/create-job-offer/create-job-offer.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'; 
import { CompetitionListComponent } from './BackOffice/competition-list/competition-list.component';
import { CreateCompetitionComponent } from './create-competition/create-competition.component';
import { CompetitionViewFrontComponent } from './competition-view-front/competition-view-front.component';
import { UpdatecompetitionComponent } from './updatecompetition/updatecompetition.component';
import { ListCompetitionFrontComponent } from './FrontOffice/list-competition-front/list-competition-front.component';
import { FormulaireCompetitionFrontComponent } from './FrontOffice/formulaire-competition-front/formulaire-competition-front.component';
import { CandidatureFrontComponent } from './FrontOffice/candidature-front/candidature-front.component';
import { CandidaturejugeFrontComponent } from './FrontOffice/candidaturejuge-front/candidaturejuge-front.component';
import { ResultatCandidatureComponent } from './resultat-candidature/resultat-candidature.component';
import { ResultComponent } from './result/result.component';
import { CandidatAccueilComponent } from './candidat-accueil/candidat-accueil.component';
import { SocketIoConfig } from 'ngx-socket-io/src/config/socket-io.config';
import { SocketIoModule } from 'ngx-socket-io';
import { WebsocketService } from './websocket.service';
import { MessageComponent } from './message/message.component';
import { MessageSendComponentComponent } from './message-send-component/MessageSendComponentComponent';
import { StatisticsComponent } from './statistics/statistics.component';
import { UpdatecandidacyComponent } from './updatecandidacy/updatecandidacy.component';
import { LoginComponent } from './User/login/login.component';
import { ShowUsersComponent } from './User/ShowUsers/showusers/showusers.component';
import { RegisterComponent } from './User/register/register.component';
import { RegisterconfirmationComponent } from './User/registerconfirmation/registerconfirmation.component';
import { ProfileComponent } from './User/profile/profile.component';
import { MyprofileComponent } from './User/myprofile/myprofile.component';
import { UserSearchComponent } from './User/user-search/user-search.component';
import { AuthNavbarComponent } from './Services/auth-navbar/auth-navbar.component';
import { ViewTutorialComponent } from './BackOffice/view-tutorial/view-tutorial.component';
import { AddTutorialComponent } from './BackOffice/add-tutorial/add-tutorial.component';
import { UpdateTutorialComponent } from './BackOffice/update-tutorial/update-tutorial.component';
import { ViewReclamationComponent } from './BackOffice/view-reclamation/view-reclamation.component';
import { AddReclamationComponent } from './BackOffice/add-reclamation/add-reclamation.component';
import { UpdateReclamationComponent } from './BackOffice/update-reclamation/update-reclamation.component';
import { StatisticsReclamationComponent } from './BackOffice/statistics-reclamation/statistics-reclamation.component';
import { FilterPipe } from './filter.pipe';
import { AddReclamationFrontComponent } from './FrontOffice/add-reclamation-front/add-reclamation-front.component';
import { ViewTutorialFrontComponent } from './FrontOffice/view-tutorial-front/view-tutorial-front.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddJobComponent } from './add-job/add-job.component';
import { ListJobComponent } from './list-job/list-job.component';
import { UpdateJobComponent } from './update-job/update-job.component';
import { JobApplicationViewComponent } from './job-application-view/job-application-view.component';
import { AddJobApplicationComponent } from './add-job-application/add-job-application.component';
import { UpdateJobApplicationComponent } from './update-job-application/update-job-application.component';
import { ListJobApplicationComponent } from './list-job-application/list-job-application.component';
import { JobApplicationDetailsComponent } from './job-application-details/job-application-details.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { ListBlogComponent } from './list-blog/list-blog.component';
import { UpdateblogComponent } from './updateblog/updateblog.component';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { CustomFilterPipe } from './Services/custom-filter-pipe.pipe';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { StaticRatingComponent } from './static-rating/static-rating.component';
import { DatePipe } from '@angular/common';
const config: SocketIoConfig = { url: 'http://localhost:8081', options: {} };

// Créez une fonction qui renvoie un TranslateHttpLoader pour charger les fichiers de langue
 
@NgModule({
  declarations: [
    AppComponent,
    AllTemplateBackComponent,
    SidebarBackComponent,
    NavebarBackComponent,
    AllTemplateFrontComponent,
    HeaderFrontComponent,
    FooterFrontComponent,
    HomeFrontComponent,
    StatisticsComponent,
    JobOfferListComponent,
    CreateJobOfferComponent,
    CompetitionListComponent,
    CreateCompetitionComponent,
    CompetitionViewFrontComponent,
    UpdatecompetitionComponent,
    ListCompetitionFrontComponent,
    FormulaireCompetitionFrontComponent,
    CandidatureFrontComponent,
    CandidaturejugeFrontComponent,
    ResultatCandidatureComponent,
    ResultComponent,
    CandidatAccueilComponent,
    MessageComponent,
    MessageSendComponentComponent,
    StatisticsComponent,
    UpdatecandidacyComponent,
    LoginComponent,
    ShowUsersComponent,
    RegisterComponent,
    RegisterconfirmationComponent,
    ProfileComponent,
    MyprofileComponent,
    UserSearchComponent,
    AuthNavbarComponent,
    AddTutorialComponent,
    ViewTutorialComponent,
    UpdateTutorialComponent,
    ViewTutorialFrontComponent,
    AddReclamationComponent,
    ViewReclamationComponent,
    UpdateReclamationComponent,
  
    AddReclamationFrontComponent,
 
    StatisticsReclamationComponent,
      FilterPipe,
      AddJobComponent,
      ListJobComponent,
      UpdateJobComponent,
      JobApplicationViewComponent,
      AddJobApplicationComponent,
      UpdateJobApplicationComponent,
      ListJobApplicationComponent,
    
      JobApplicationDetailsComponent,
         AddBlogComponent,
         ListBlogComponent,
         UpdateblogComponent,
         BlogViewComponent,
         BlogDetailsComponent,
         StaticRatingComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    NgxPaginationModule,
    Ng2SearchPipeModule
     
  ],
  providers: [WebsocketService,DatePipe,CustomFilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
