import { Injectable } from '@angular/core';
import { Contacts } from '../models/Contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contacts: Contacts[]=[];
  constructor() { }

  getAllContacts(){
    if (localStorage.getItem('contacts') === null) {
      this.contacts =[];
    }else{
        this.contacts = JSON.parse(localStorage.getItem('contacts'))
    }
    return this.contacts;
  }

  getContact(nroIdentificacion:number){
    if (localStorage.getItem('contacts') === null) {
      this.contacts =[];
    }else{
        this.contacts = JSON.parse(localStorage.getItem('contacts'))
    }
    return this.contacts.filter(el => {
      return el.nroIdentificacion ==nroIdentificacion
    })[0];
  }

  addContact(contact:Contacts){
    this.contacts.push(contact);
    let contacts = [];
    if (localStorage.getItem('contacts') === null) {
        contacts=[];
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }else{
      contacts = JSON.parse(localStorage.getItem('contacts'));
      contacts.push(contact);
      localStorage.setItem('contacts', JSON.stringify(contacts))
    }
  }

  updateContact(contact:Contacts){
    let contacts:Contacts[] =  JSON.parse(localStorage.getItem('contacts'));
    let updatedContacts =contacts.filter(el =>{
    return el.nroIdentificacion != contact.nroIdentificacion
    });
    updatedContacts.push(contact)
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  }

  deleteContact(contact:Contacts){
    let contacts = this.contacts.filter(el =>{
      return el.nroIdentificacion != contact.nroIdentificacion
    });
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

}
