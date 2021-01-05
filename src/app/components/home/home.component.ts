import { Component, OnInit } from '@angular/core';
import { Contacts } from 'src/app/models/Contacts';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  contacts:number;
  birthdayContacts:number;

  constructor(public contactServices : ContactsService) { }

  ngOnInit(): void {
    let dateNow =new Date(Date.now()).toISOString().substring(0,10);
     this.contacts= this.contacts = this.contactServices.getAllContacts().length;
     this.birthdayContacts = this.contactServices.getAllContacts().filter(el => {
      return el.birthday == dateNow
    }).length;
  }

}
