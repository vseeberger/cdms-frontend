import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { CrudService } from 'src/app/shared/services/crud.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ClienteCadastroComponent } from '../../cliente/cliente-cadastro/cliente-cadastro.component';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.scss'],
  // host: {
  //   '(document:keydown)': 'detectarTecla($event)'
  // }
})
export class VendaComponent implements OnInit {

  fb = new FormBuilder();
  produtoIncluir = this.getForm();
  produtoEditando = null;
  pedido = this.getPedido();
  loading = false;


  /**
   * LISTAS
   */
  LstClientes = [];

  constructor(
    private crud: CrudService
    , private toastr: ToastrService
    , public dialog: MatDialog
  ) { }

  getForm(item?) {
    return this.fb.group({
      Item: [_.isNil(item) ? 0 : item.Item, [Validators.required]],
      ProdutoId: [_.isNil(item) ? undefined : item.ProdutoId, [Validators.required]],
      ProdutoQuantidade: [_.isNil(item) ? 1 : item.ProdutoQuantidade, [Validators.required, Validators.min(1)]],
      ProdutoValorUn: [_.isNil(item) ? 0 : item.ProdutoValorUn, [Validators.required, Validators.min(1)]],
      Produto: [_.isNil(item) || _.isNil(item.Produto) ? undefined : item.Produto]
    });
  }

  getPedido() {
    return this.fb.group({
      Id: [undefined],
      Cliente: [undefined],
      ClienteId: [undefined, [Validators.required]],
      Produtos: new FormArray([]),
      DDesconto: [0, [Validators.required, Validators.min(0)]],
      DValorPedido: [0, [Validators.required, Validators.min(0)]],
      DValorTotal: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  async ngOnInit() {
    await this.carregarClientes();
    this.atualizaTotalFinal(null);
  }

  enterutilizado = false;
  detectarTeclaProduto(evento) {
    if(evento.keyCode === 13) {
      const codprod = this.produtoIncluir.get('ProdutoId').value;
      if(_.isNil(codprod) || codprod === '' || codprod === 0) {
        this.produtoEditando = null;
        this.enterutilizado = false;
      } else {
        
        this.loading = true;
        this.crud.getOne('Produtos', codprod)
        .subscribe(q => { 
          let p: any = q;
          this.produtoIncluir.get('ProdutoValorUn').setValue(p.DValor)
          this.produtoEditando = q;
          this.produtoIncluir.get('Produto').setValue(q);

          if(this.enterutilizado) {
            this.addProduto(this.produtoIncluir);
          }
          this.enterutilizado = true;
        }, () => {
          this.enterutilizado = false;
          this.produtoEditando = null;
          this.toastr.error('Não foi possível localizar o produto cadastrado...')
        }, () => {
          this.loading = false;
        })

      }

    } else this.enterutilizado = false;

  }

  atualizaTotalFinal(e) {
    const valorTotal = this.pedido.get('DValorPedido').value;
    let descontoAplicado = this.pedido.get('DDesconto').value;

    if (_.isNil(descontoAplicado)) {
      this.pedido.get('DDesconto').setValue(0);
      descontoAplicado = 0;
    }

    if (!_.isNil(valorTotal) && valorTotal > 0) {
      if ((valorTotal - descontoAplicado) < 0) this.pedido.get('DValorTotal').setValue(0);
      else this.pedido.get('DValorTotal').setValue(valorTotal - descontoAplicado);
    } else {
      this.pedido.get('DValorTotal').setValue(valorTotal);
    }
  }

  detectarTecla(evento: KeyboardEvent) {
    switch (evento.code) {
      case "F5":
        return false;
      case "F2":
        // Cadastro de cliente
        return false;
      case "F3":
        // Cadastro de produto
        return false;
      case "F4":
        // Finalizar venda
        return false;
    }
  }

  addProduto(item?) {
    if(this.produtoIncluir.get('ProdutoQuantidade').value > 0) {
      if(!item) item = this.produtoIncluir;
      const itemsControl = <FormArray>this.pedido.controls.Produtos;
      let lstAdded = this.pedido.controls.Produtos.value;
      lstAdded.push(item.value);
      itemsControl.push(this.getForm(item.value));
      
      this.calcularPedido(lstAdded);
      
      this.produtoEditando = null;
      this.produtoIncluir = this.getForm();

    } else {
      this.toastr.error('A quantidade deve ser maior do que zero!');
    }
  }

  calcularPedido(lstAdded) {
    // calcular o valor do pedido
    let dValor = 0;
    let valor = (lstAdded.reduce((n, {ProdutoQuantidade, Produto}) => n + (ProdutoQuantidade * Produto.DValor), 0));
    this.pedido.get('DValorPedido').setValue(valor);
    this.atualizaTotalFinal(null);
  }

  error(msg?){ this.toastr.error(_.isNil(msg) ? 'Informe um produto para continuar...' : msg); }

  finalizarPedido() {
    this.loading = true;
    this.crud.insert('Pedidos', this.pedido.value)
      .subscribe(q => {
          this.toastr.success('Pedido cadastrado!');
          this.pedido = this.getPedido();
      }, err =>{ 
        this.loading = false;
        this.toastr.error(err.error.Message);
      })
  }

  novoCliente() {
    const dialogRef = this.dialog.open(ClienteCadastroComponent, {
      hasBackdrop: true,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.carregarClientes();
    });
  }

  async carregarClientes() {
    await this.crud.getAll('Clientes')
      .subscribe(q => { 
        this.LstClientes = q;
      })
  }

  remover(idx) {
    const itemsControl = <FormArray>this.pedido.controls.Produtos;
    itemsControl.removeAt(idx);
    let lstAdded = this.pedido.controls.Produtos.value;
    this.calcularPedido(lstAdded);
  }
}
