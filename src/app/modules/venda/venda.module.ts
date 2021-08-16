import { NgModule } from '@angular/core';
import { VendaComponent } from './venda/venda.component';
import { RouterModule } from '@angular/router';
import { VendaRoutes } from './venda.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClienteCadastroComponent } from '../cliente/cliente-cadastro/cliente-cadastro.component';


@NgModule({
  declarations: [
    VendaComponent,
    ClienteCadastroComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(VendaRoutes),
  ]
})
export class VendaModule { }
