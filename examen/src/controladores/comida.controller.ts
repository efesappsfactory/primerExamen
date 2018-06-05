import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ComidaService } from '../servicios/comida.service';
import { COMIDA_SCHEMA } from '../comida/comida.schema';
import { ComidaPipe } from '../pipes/comida.pipe';

@Controller('Comida')

export class ComidaController {

  constructor(private _comidaService: ComidaService) {}

  @Get('comida')
  listarTodos(
    @Req() request,
    @Res() response,
  ) {
    const comidas = this._comidaService.listarComidas();
    return response
      .status(200)
      .send(comidas);
  }

  @Post('crearComida')
  crearComida(
    @Body(new ComidaPipe(COMIDA_SCHEMA)) bodyParams,
    @Res() response
  ){
    const nuevaComida = {
      idPlato: bodyParams.idPlato,
      nombrePlato: bodyParams.nombrePlato,
      descripcionPlato: bodyParams.descripcionPlato,
      nacionalidad: bodyParams.nacionalidad,
      numeroPersonas: bodyParams.numeroPersonas,
      picante: bodyParams.picante
    }
    const comidaCreada = this._comidaService.crearComida(nuevaComida);
    return response.send(comidaCreada);
  }

  @Get('buscarComida')
  obtenerUno(
    @Req() request,
    @Res() response,
  ){
    const comida = this._comidaService.buscarComida(request.query.id);
    return response
      .status(200)
      .send(comida);
  }

}