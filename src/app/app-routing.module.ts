import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { JobOfferListComponent } from './FrontOffice/job-offer-list/job-offer-list.component';

import { CreateJobOfferComponent } from './FrontOffice/create-job-offer/create-job-offer.component';
import { CompetitionListComponent } from './BackOffice/competition-list/competition-list.component';
import { CreateCompetitionComponent } from './create-competition/create-competition.component';
import { CompetitionViewFrontComponent } from './competition-view-front/competition-view-front.component';
import { UpdatecompetitionComponent } from './updatecompetition/updatecompetition.component';
import { ListCompetitionFrontComponent } from './FrontOffice/list-competition-front/list-competition-front.component';
import { FormulaireCompetitionFrontComponent } from './FrontOffice/formulaire-competition-front/formulaire-competition-front.component';
import { CandidatureFrontComponent } from './FrontOffice/candidature-front/candidature-front.component';
import { CandidaturejugeFrontComponent } from './FrontOffice/candidaturejuge-front/candidaturejuge-front.component';
import { ResultatCandidatureComponent } from './resultat-candidature/resultat-candidature.component';
import { CandidatAccueilComponent } from './candidat-accueil/candidat-accueil.component';
import { MessageSendComponentComponent } from './message-send-component/MessageSendComponentComponent';
import { StatisticsComponent } from './statistics/statistics.component';
import { UpdatecandidacyComponent } from './updatecandidacy/updatecandidacy.component';
import { LoginComponent } from './User/login/login.component';
import { RegisterComponent } from './User/register/register.component';
import { ShowUsersComponent } from './User/ShowUsers/showusers/showusers.component';
import { RegisterconfirmationComponent } from './User/registerconfirmation/registerconfirmation.component';
import { ProfileComponent } from './User/profile/profile.component';
import { MyprofileComponent } from './User/myprofile/myprofile.component';
const routes: Routes = [

{
  path:"",
  component:AllTemplateFrontComponent
 


},
 {path:'joboffers',
 component:JobOfferListComponent},
 {path:'competition-list',
 component:CompetitionListComponent},
 {path: "competition-list/create-competition", component: CreateCompetitionComponent},
 {path: "competition-listFront", component: ListCompetitionFrontComponent},
 {path: "candidacyfronts", component: CandidatAccueilComponent},
 {path: "Candidature/:idcompetition", component: FormulaireCompetitionFrontComponent},
 {path: "CandidatureUser", component: CandidatureFrontComponent},
 {path: "Candidaturejuge", component: CandidaturejugeFrontComponent},
 {path: "result", component: ResultatCandidatureComponent},
 {path: "message/:userId1/:userId2", component: MessageSendComponentComponent},
 {path: "Stat", component: StatisticsComponent},
 {path:'update-candiday/:id',
 component:UpdatecandidacyComponent},
 {path:'update-competition/:id',
 component:UpdatecompetitionComponent},
  {path: 'create-job-offer',
   component:CreateJobOfferComponent},
  

  {path: '', redirectTo: 'joboffers',
   pathMatch: 'full'},
{
  path:"admin",
  component:AllTemplateBackComponent

},
{
  path:"myprofile/:id",
  component:MyprofileComponent

},
{
  path:"login",
  component:LoginComponent

},
{
  path:"profile",
  component:ProfileComponent

},
{
  path:"register",
  component:RegisterComponent

},
{
  path:"confirmed",
  component:RegisterconfirmationComponent

},
{
  path:"show",
  component:ShowUsersComponent

},
{
  path:"admin",
  component:AllTemplateBackComponent

}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }