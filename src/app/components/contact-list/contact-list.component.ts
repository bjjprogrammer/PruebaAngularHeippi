import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { Contacts } from '../../models/Contacts';
import { Subscription } from 'rxjs';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styles: [
  ]
})
export class ContactListComponent implements OnInit, OnDestroy  {
  subscriptionItem: Subscription;
  contacts:Contacts[];

  constructor(public contactServices:ContactsService, private commonService: CommonService) {
      this.subscriptionItem = this.commonService.getUpdateItem().subscribe
      (contact => {

      let index = this.contacts.indexOf(contact);

        if(index > -1){
        this.contacts.splice(index, 1);
        }

      });
    }

  ngOnInit(): void {
    this.contacts = this.contactServices.getAllContacts();
  }

  @HostListener('unloaded')
  ngOnDestroy()  {

    if (this.subscriptionItem) {

      this.subscriptionItem.unsubscribe();
    }

  }

}
