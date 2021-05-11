import { Component, OnInit } from '@angular/core';
import { ShortUrlService } from 'src/app/services/short-url.service';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css']
})
export class ShortUrlComponent implements OnInit {

  nombreUrl: string;
  urlShort: string;
  urlProcesada: boolean;
  loading: boolean;
  mostrarError: boolean;
  textError: string;

  constructor(private _shortUrlService: ShortUrlService) {
    this.nombreUrl = '';
    this.urlShort = '';
    this.urlProcesada = false;
    this.loading = false;
    this.mostrarError = false;
    this.textError = '';
  }

  ngOnInit(): void {
  }

  procesarUrl() {

    if(this.nombreUrl.trim().length === 0) {
      this.error('Por favor ingresar URL');
    }

    this.loading = true;
    setTimeout(() => {
      this.obtenerUrlShort();
    }, 3000);

  }

  obtenerUrlShort() {
    this.urlProcesada = false;
    this._shortUrlService.getUrlShort(this.nombreUrl).subscribe(data => {
      console.log(data);
      this.urlProcesada = true;
      this.urlShort = data.link;
      this.loading = false;
    }, error => {
      console.log(error.error.description);
      if(error.error.description == 'The value provided is invalid.'){
        this.error('Ingrese una URL válida');
      }
      this.loading = false;
    });
  }

  error(valor: string){
    this.nombreUrl = '';
    this.mostrarError = true;
    this.textError = valor;
    setTimeout(() => {
      this.mostrarError = false;
    }, 4000);
    return;
  }
}
