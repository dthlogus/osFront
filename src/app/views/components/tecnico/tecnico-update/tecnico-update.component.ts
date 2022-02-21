import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

  id_tecnico = '';

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  nome = new FormControl('', [Validators.minLength(5)]);
  cpf = new FormControl('', [Validators.minLength(11)]);
  telefone = new FormControl('', [Validators.minLength(11)]);


  constructor(
    private router: Router,
    private service: TecnicoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id_tecnico = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  update(): void{
    this.service.update(this.tecnico).subscribe((resposta) => {
      this.router.navigate(['tecnicos']);
      this.service.message('Tecnico atualizado com sucesso');
    }, err => {
      if (err.error.error.match('já cadastrado')) {
        this.service.message(err.error.error);
      }
      if (err.error.errors[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido") {
        this.service.message("CPF inválido");
      }
    })
  }

  findById(): void{
    this.service.findById(this.id_tecnico).subscribe((resposta) => this.tecnico = resposta);
  }

  cancel(): void{
    this.router.navigate(['/tecnicos'])
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
