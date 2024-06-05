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
import { ViewTutorialComponent } from './BackOffice/view-tutorial/view-tutorial.component';
import { AddTutorialComponent } from './BackOffice/add-tutorial/add-tutorial.component';
import { UpdateTutorialComponent } from './BackOffice/update-tutorial/update-tutorial.component';
import { ViewReclamationComponent } from './BackOffice/view-reclamation/view-reclamation.component';
import { AddReclamationComponent } from './BackOffice/add-reclamation/add-reclamation.component';
import { UpdateReclamationComponent } from './BackOffice/update-reclamation/update-reclamation.component';
import { StatisticsReclamationComponent } from './BackOffice/statistics-reclamation/statistics-reclamation.component';
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
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { StaticRatingComponent } from './static-rating/static-rating.component';
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
 {path: 'add',component:AddJobComponent},
 {path:'list',component:ListJobComponent},
 { path: 'updateJobOffer/:idR', component: UpdateJobComponent},
 {path:'view',component:JobApplicationViewComponent},
 {path:'addJobApp/:idR',component:AddJobApplicationComponent},
 {path:'updateJobApp/:idD',component:UpdateJobApplicationComponent},
 {path:'listJobApp',component:ListJobApplicationComponent},
 {path:'details/:id',component:JobApplicationDetailsComponent},
 {path:'addblog',component:AddBlogComponent},
 {path:'blogs',component:ListBlogComponent},
 {path:'editblog/:id',component:UpdateblogComponent},
 {path:'Blogview',component:BlogViewComponent},
 { path: 'blog/:id', component: BlogDetailsComponent },
 {path:'static',component:StaticRatingComponent},
   {path: 'view-tutorial',component:ViewTutorialComponent},
   {path:"view-tutorial/add-tutorial",component:AddTutorialComponent},
   {path:'update-tutorial/:id',
   component:UpdateTutorialComponent},
   {path: 'view-reclamation',
   component:ViewReclamationComponent},
   {path:"view-reclamation/add-reclamation",component:AddReclamationComponent},
   {path:'update-reclamation/:id',
   component:UpdateReclamationComponent},
   {path: 'statistics-reclamation',
   component:StatisticsReclamationComponent},

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