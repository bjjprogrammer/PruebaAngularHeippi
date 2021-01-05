import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { CreateContactComponent } from './components/create-contact/create-contact.component';
import { UpdateContactComponent } from './components/update-contact/update-contact.component';


export const ROUTES:Routes =[
  { path: 'home', component: HomeComponent },
  { path: 'contacts', component: ContactListComponent },
  { path: 'createContact', component: CreateContactComponent },
  { path: 'updateContact/:nroIdentificacion', component: UpdateContactComponent},
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
]
