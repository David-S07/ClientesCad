import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes : Cliente[] = [];
  clienteSelecionado: Cliente;
  mensagemSucesso: string;
  mensagemErro: string;

  _filter: string;
  _filterTipo: string;
  filteredClientes:  Cliente[] = [];

  typePeoplePJ: boolean = false;
  typePeople: String;

  constructor(private service: ClientesService, private router: Router) {  
   }
   
  ngOnInit(): void {
    this.service.getCliente()
    .subscribe((resp: Cliente[]) => {
      this.clientes = resp;
      this.filteredClientes = resp;
    });
  }
  
  novoCadastro() {
    this.router.navigate(['/clientes-form'])
  }

  preparaDelecao(cliente: Cliente) {
    this.clienteSelecionado = cliente;
  }

  deletarCliente() {
    this.service
    .deletar(this.clienteSelecionado)
    .subscribe(response => {
      this.mensagemSucesso = 'Cliente deletado com sucesso ! ' 
      this.ngOnInit();
    },
      erro => this.mensagemErro = 'Ocorreu um erro ao deletar o cliente. ')
  }

  set filterTipoPessoa(value: string) {
    this._filterTipo = value;
    this.filteredClientes = this.clientes.filter((cliente: Cliente) => cliente.tipoDePessoa.toLocaleLowerCase().indexOf(this._filterTipo.toLocaleLowerCase()) > -1);
  }

  get filterTipoPessoa() : string {
    return this._filterTipo;
  }

  set filter(value: string) {
    this._filter = value;
    this.filteredClientes = this.clientes.filter((cliente: Cliente) => cliente.nome.toLocaleLowerCase().indexOf(this._filter.toLocaleLowerCase()) > -1);
  }

  get filter() : string {
    return this._filter;
  }

  selecionaTipoPessoa(value: string) {
    this.typePeople = value;
    if(this.typePeople.indexOf("PJ")) {
      this.typePeoplePJ = true;
    } else {  
      this.typePeoplePJ = false;
    }
  }


}
