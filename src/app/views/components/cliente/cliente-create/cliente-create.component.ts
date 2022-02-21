import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  nome = new FormControl('', [Validators.minLength(5)]);
  cpf = new FormControl('', [Validators.minLength(11)]);
  telefone = new FormControl('', [Validators.minLength(11)]);

  constructor(private router:Router, private service:ClienteService) { }

  ngOnInit(): void {
  }

  cancel(): void{
    this.router.navigate(['/clientes'])
  }

  create(): void {
    this.service.create(this.cliente).subscribe((resposta) => {
    this.router.navigate(['/clientes'])
    this.service.message('Cliente criado com sucesso')
    }, err => {
      if (err.error.error.match('já cadastrado')) {
        this.service.message(err.error.error);
      }
      if (err.error.errors[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido") {
        this.service.message("CPF inválido");
      }
    });
  }
  
  errorValidName() {
    if (this.nome.invalid) {
      return "O nome deve ter no mínimo 5 caracteres e no máximo 100 caracteres"
    }
    return false;
  }
  
  errorValidCpf() {
    if (this.cpf.invalid) {
      return "O CPF deve ter exatamente 11 caracteres"
    }
    return false;
  }

  errorValidTelefone() {
    if (this.telefone.invalid) {
      return "Os telefones brasileiros tem exatametne 11 caracteres"
    }
    return false;
  }

}
