import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContadorComponent } from './components/contador/contador.component';
import { ROUTES } from './app-routes';
import { ContactsService } from './services/contacts.service';
import { ContactComponent } from './components/contact/contact.component';
import { CreateContactComponent } from './components/create-contact/create-contact.component';
import { UpdateContactComponent } from './components/update-contact/update-contact.component';
import { CommonService } from './services/common.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    ContactListComponent,
    ContadorComponent,
    ContactComponent,
    CreateContactComponent,
    UpdateContactComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( ROUTES, { useHash: true } ),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    ContactsService,
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
