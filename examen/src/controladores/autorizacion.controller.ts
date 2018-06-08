import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AutorizacionService } from '../servicios/autorizacion.service';
import { NotFoundException } from '../exceptions/not-found.exception';

@Controller('Autorizacion')

export class AutorizacionController {

  constructor(private _autorizacionService: AutorizacionService) {}

  @Post('iniciarSesion')
  iniciarSesion(
    @Body() bodyParams,
    @Req() request,
    @Res() response
  ){

    const usuarioRecibido = {
      usuario: bodyParams.usuario,
      password: bodyParams.password,
    };

    console.log('Cookies: ', request.cookies);
    response.cookie('token', bodyParams.usuario);
    if (this._autorizacionService.validarUsuario(usuarioRecibido)){
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

  @Post('cerrarSesion')
  cerrarSesion(
    @Req() request,
    @Res() response
  ){
    const existeCookie = request.cookies['token'];
    if (existeCookie) {
      response.cookie('token', undefined);
      return response.send({mensaje: 'Usted ha salido del sistema.'})
    } else {
      throw new NotFoundException(
        {
          mensaje: 'No existe la cookie.'
        },
        10
      )
    }

  }

}