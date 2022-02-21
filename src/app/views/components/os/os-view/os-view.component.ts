import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { OS } from 'src/app/models/os';
import { OsService } from 'src/app/services/os.service';

@Component({
  selector: 'app-os-view',
  templateUrl: './os-view.component.html',
  styleUrls: ['./os-view.component.css']
})
export class OsViewComponent implements OnInit {

  os: OS = {
    tecnico: '',
    cliente: '',
    status: '',
    prioridade: '',
    observacoes: ''
  }

  constructor(
    private route: ActivatedRoute,
    private osService: OsService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.os.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.osService.findById(this.os.id).subscribe(resposta => {
      this.os = resposta;
    })
  }

  cancel(): void{
    this._location.back();
  }

}
