import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.scss']
})
export class ClienteCadastroComponent implements OnInit {
  fb = new FormBuilder();
  clienteForm = this.getForm();

  salvando = false;

  getForm(item?) {
    return this.fb.group({
      SNome: [_.isNil(item) ? undefined : item.SNome, [Validators.required, Validators.maxLength(200)]],
      SEmail: [_.isNil(item) ? undefined : item.SEmail, [Validators.required, Validators.maxLength(200)]],
      SAldeia: [_.isNil(item) ? undefined : item.SAldeia, [Validators.required, Validators.maxLength(200)]]
    });
  }
  
  constructor(
    private crud: CrudService,
    private matresult: MatDialogRef<any>,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  salvar() {
    this.salvando = true;
    this.crud.insert('Clientes', this.clienteForm.value)
      .subscribe(q => {
        console.log(q);
          this.matresult['data'] = q;
          this.toastr.success('Cliente cadastrado!');
          this.matresult.close();
      }, err =>{ 
        this.salvando = false;
        console.error(err);
        this.toastr.error(err.error.Message);
      })
  }
}
