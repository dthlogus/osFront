import { Component, OnInit } from '@angular/core';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Tecnico } from 'src/app/models/tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { OS } from 'src/app/models/os';
import { OsService } from 'src/app/services/os.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-os-create',
  templateUrl: './os-create.component.html',
  styleUrls: ['./os-create.component.css']
})
export class OsCreateComponent implements OnInit {

  os: OS = {
    tecnico: '',
    cliente: '',
    observacoes: '',
    status: '',
    prioridade: ''
  }

  tecnicos: Tecnico[] = [];

  clientes: Cliente[] = [];

  constructor(
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private osService: OsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listarTecnicos();
    this.listarClientes();
  }

  listarTecnicos(): void{
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  listarClientes(): void{
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  create(): void {
    this.osService.create(this.os).subscribe(resposta => {
      this.osService.message('Ordem serviço criada com sucesso');
      this.router.navigate(['os']);
    });
  }

  cancel(): void{
    this.router.navigate(['os']);
  }

}
