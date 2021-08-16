import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';
import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [ClienteCadastroComponent, ClienteListaComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ClienteModule { }
