import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressesComponent } from './components/addresses/addresses.component';
import { ClientsComponent } from './components/clients/clients.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: ClientsComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'addresses', component: AddressesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
