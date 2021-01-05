import { Component, OnInit, Input } from '@angular/core';
import { Contacts } from 'src/app/models/Contacts';
import { ContactsService } from '../../services/contacts.service';
import { CommonService } from '../../services/common.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styles: [
  ]
})
export class ContactComponent implements OnInit {

  @Input() contact: Contacts;
  constructor(public contactServices:ContactsService, private commonService : CommonService) { }

  ngOnInit(): void {
  }

  deleteContact(contact:Contacts){
    if (confirm('¿Estas seguro de querrer eliminar este contacto Juancho?')) {
      this.contactServices.deleteContact(contact)
      this.commonService.deleteItem(contact)
    }
  }

}
