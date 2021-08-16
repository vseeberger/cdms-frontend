import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutPadraoComponent } from './core/layout/layout-padrao/layout-padrao.component';

const routes: Routes = [
  { 
    path: '', 
    component: LayoutPadraoComponent, 
    loadChildren: () => import('./modules/venda/venda.module').then(m => m.VendaModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
