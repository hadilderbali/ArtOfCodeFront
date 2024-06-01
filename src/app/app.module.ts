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

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
     
  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
