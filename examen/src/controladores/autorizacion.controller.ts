import { Body, Controller, Post } from '@nestjs/common';
import { AutorizacionService } from '../servicios/autorizacion.service';

@Controller('Autorizacion')

export class AutorizacionController {

  constructor(private _autorizacionService: AutorizacionService) {}

  @Post('autorizacion')
  iniciarSesion(@Body() usuario){
    const usuarioEncontrado = this._autorizacionService.buscarUsuario(usuario);
    if (usuarioEncontrado){

    }

  }

}