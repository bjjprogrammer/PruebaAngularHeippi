import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import {Router} from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styles: [
  ]
})
export class CreateContactComponent implements OnInit {
  public contactForm: FormGroup;
  constructor(public contactsService: ContactsService, private router: Router, private toastr:ToastrService) {
    this.contactForm = this.createForm();
   }

  showInfo() {
    this.toastr.info('Todos los campos deben ser llenados para poder guardar el contacto', 'Importante');
  }

  ngOnInit(): void {
    this.showInfo();
  }

  showSuccess() {
    this.toastr.success('Usuario Creado Sastifactoriamente', 'Excelente!!');
  }

  createForm() {
    return new FormGroup({
      nroIdentificacion: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      dir: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required])
    });
  }

  onResetForm(): void {
    this.contactForm.reset();
  }

  createNewContact(){
    if (this.contactForm.valid) {
      this.contactsService.addContact(this.contactForm.value)
      this.onResetForm();
      this.showSuccess();
      this.router.navigateByUrl('/contacts');
    }
  }
}
