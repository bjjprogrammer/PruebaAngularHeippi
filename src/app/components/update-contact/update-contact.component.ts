import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ContactsService } from '../../services/contacts.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styles: [
  ]
})
export class UpdateContactComponent implements OnInit {
  public contactForm: FormGroup;
  contact:any;
  constructor(private rutaActiva: ActivatedRoute, public contactsServices:ContactsService, private router: Router, private toastr:ToastrService) {
    this.contact = this.contactsServices.getContact(this.rutaActiva.snapshot.params.nroIdentificacion)
    this.contactForm = this.updateForm();
  }

  ngOnInit(): void {}

  showSuccess() {
    this.toastr.success('Usuario actualizado exitosamente', 'Excelente!!');
  }

  updateForm() {
    return new FormGroup({
      nroIdentificacion: new FormControl({value:this.contact.nroIdentificacion, disabled:true}, [Validators.required]),
      fullName: new FormControl(this.contact.fullName, [Validators.required]),
      phone: new FormControl(this.contact.phone, [Validators.required]),
      dir: new FormControl(this.contact.dir, [Validators.required]),
      birthday: new FormControl(this.contact.birthday, [Validators.required])
    });
  }

  updateContact(){
      if (confirm('¿Estas seguro de Actualizar?')) {
        typeof this.contactForm.value.nroIdentificacion === "undefined" ? this.contactForm.value.nroIdentificacion = this.contact.nroIdentificacion : this.contactForm.value.nroIdentificacion
        this.contactsServices.updateContact(this.contactForm.value)
        this.showSuccess();
        this.router.navigateByUrl('/contacts');
      }
  }

}
