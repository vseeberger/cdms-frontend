import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';
import { ProdutoListaComponent } from './produto-lista/produto-lista.component';



@NgModule({
  declarations: [ProdutoCadastroComponent, ProdutoListaComponent],
  imports: [
    CommonModule
  ]
})
export class ProdutoModule { }
