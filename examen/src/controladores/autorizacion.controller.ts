import { Body, Controller, Post, Res } from '@nestjs/common';
import { AutorizacionService } from '../servicios/autorizacion.service';
import { NotFoundException } from '../exceptions/not-found.exception';

@Controller('Autorizacion')

export class AutorizacionController {

  constructor(private _autorizacionService: AutorizacionService) {}

  @Post('iniciarSesion')
  iniciarSesion(
    @Body() bodyParams,
    @Res() response
  ){

    const usuarioRecibido = {
      usuario: bodyParams.usuario,
      password: bodyParams.password
    };

    if (this._autorizacionService.validarUsuario(usuarioRecibido)){
      response.cookie('token', bodyParams.usuario);
      return response.send({mensaje: 'ok'})
    } else {
      throw new NotFoundException(
        {
          mensaje: 'Usuario no existe. Por favor regístrese.'
        },
        10
      )
    }
  }

}