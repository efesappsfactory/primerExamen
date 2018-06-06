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

  buscarComida(idComidaABuscar: string): ComidaEntity {
    return this.comidas.find((comida: ComidaEntity) => comida.idPlato === idComidaABuscar);
  }

  buscarIndiceComida(idComidaABuscar: string): number {
    return this.comidas.indexOf(this.comidas
      .find((comida: ComidaEntity) =>
        comida.idPlato === idComidaABuscar));
  }

  actualizarComida(indiceComida: number, comida: ComidaEntity): ComidaEntity {
    for (let comidaKey in comida) {
      if (comida[comidaKey] !== undefined) {
        this.comidas[indiceComida][comidaKey] = comida[comidaKey];
      }
    }
    return this.comidas[indiceComida];
  }
}