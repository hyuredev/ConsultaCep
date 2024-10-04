import { Component } from '@angular/core';
import { CepService } from '../cep.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  cep: string = '';
  endereco: any;
  cepInvalido: boolean = false; // Nova variável para controle de erro

  constructor(private cepService: CepService) {}

  consultarEndereco() {
    this.cepInvalido = false; // Reseta o estado do erro

    // Verifica se o CEP possui 8 dígitos e se é numérico
    if (this.cep.length !== 8 || isNaN(Number(this.cep))) {
      this.cepInvalido = true;
      return;
    }

    this.cepService.buscarEndereco(this.cep).subscribe(data => {
      if (data.erro) {
        this.cepInvalido = true; // Marca como inválido se a API retornar erro
      } else {
        this.endereco = data;
      }
    }, error => {
      console.error('Erro ao consultar o CEP', error);
      this.cepInvalido = true; // Marca como inválido em caso de erro
    });
  }
}