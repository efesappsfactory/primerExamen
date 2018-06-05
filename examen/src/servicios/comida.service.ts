import { ComidaEntity} from '../comida/comida.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ComidaService {
  comidas: ComidaEntity[] = [];

  listarComidas(): ComidaEntity[] {
    return this.comidas;
  }

  crearComida(comida: ComidaEntity): ComidaEntity {
    this.comidas.push(comida);
    return comida;
  }

  buscarComida(idComidaABuscar: number): ComidaEntity {
    return this.comidas.find((comida: ComidaEntity) => comida.idPlato === idComidaABuscar);
  }
}