import { Injectable } from '@nestjs/common';
import { IngredientesEntity } from '../ingredientes/ingredientes.entity';

@Injectable()
export class IngredientesService {
  ingredientes: IngredientesEntity [] = [];

  listarIngredientes(): IngredientesEntity[] {
    return this.ingredientes;
  }

  crearIngrediente(ingrediente: IngredientesEntity): IngredientesEntity{
    this.ingredientes.push(ingrediente);
    return ingrediente;
  }

  buscarIngrediente(idIngredienteABuscar: string): IngredientesEntity {
    return this.ingredientes.find((ingrediente: IngredientesEntity) => ingrediente.idIngrediente === idIngredienteABuscar);
  }
}