
import { AddPetComponent } from './add-pet/add-pet.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { PetsComponent } from './pets/pets.component';
import { DetailsComponent } from './details/details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: 'pets/add',component: AddPetComponent },
  { path: 'pets/edit/:id',component: EditPetComponent },
  { path: 'details-app/:id', component: DetailsComponent },
  { path: 'pet-app',component: PetsComponent },
  { path: '', pathMatch: 'full', redirectTo: '/pets-app' },
  // the ** will catch anything that did not match any of the above routes
  { path: '**', component: PetsComponent }
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }