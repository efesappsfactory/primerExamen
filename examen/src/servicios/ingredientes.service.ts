import { Injectable } from '@nestjs/common';
import { IngredienteEntity } from '../ingredientes/ingredienteEntity';

@Injectable()
export class IngredientesService {

  ingredientes: IngredienteEntity [] = [];

  listarIngredientes(): IngredienteEntity[] {
    return this.ingredientes;
  }

  crearIngrediente(ingrediente: IngredienteEntity): IngredienteEntity {
    this.ingredientes.push(ingrediente);
    return ingrediente;
  }

  buscarIngrediente(idIngredienteABuscar: string): IngredienteEntity {
    return this.ingredientes.find((ingrediente: IngredienteEntity) => ingrediente.idIngrediente === idIngredienteABuscar);
  }

  buscarIndiceIngrediente(idIngredienteABuscar: string): number {
    return this.ingredientes.indexOf(this.ingredientes
      .find((ingrediente: IngredienteEntity) =>
        ingrediente.idIngrediente === idIngredienteABuscar));
  }

  actualizarIngrediente(indiceIngrediente: number, ingrediente: IngredienteEntity): IngredienteEntity {
    for (let ingredienteKey in ingrediente) {
      if (ingrediente[ingredienteKey] !== undefined) {
        this.ingredientes[indiceIngrediente][ingredienteKey] = ingrediente[ingredienteKey];
      }
    }
    return this.ingredientes[indiceIngrediente];
  }
}