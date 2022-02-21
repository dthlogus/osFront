import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OS } from 'src/app/models/os';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-closed',
  templateUrl: './os-closed.component.html',
  styleUrls: ['./os-closed.component.css']
})
export class OsClosedComponent implements AfterViewInit{

  ListOs: OS[] = [];

  displayedColumns: string[] = ['cliente', 'tecnico', 'abertura', 'fechamento', 'prioridade', 'status', 'action'];
  dataSource = new MatTableDataSource<OS>(this.ListOs);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: OsService,
    private router: Router,
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.findAll();
  }

  findAll():void{
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach(os => {
        if (os.status == "ENCERRADO") {
          this.ListOs.push(os);
        }
      })
      this.listaTecnico();
      this.listaCliente();
      this.dataSource = new MatTableDataSource<OS>(this.ListOs);
      this.dataSource.paginator = this.paginator;
    })
  }

  listaTecnico(): void{
    this.ListOs.forEach(os => {
      this.tecnicoService.findById(os.tecnico).subscribe(resposta => os.tecnico = resposta.nome)
    })
  }

  listaCliente(): void{
    this.ListOs.forEach(os => {
      this.clienteService.findById(os.cliente).subscribe(resposta => os.cliente = resposta.nome)
    })
  }

  prioridade(prioridade: any){
    if (prioridade == 'BAIXA') {
      return 'baixa';
    }
    if (prioridade == 'MEDIA') {
      return 'media';
    }
    return 'alta';
  }
}