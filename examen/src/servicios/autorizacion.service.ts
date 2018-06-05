import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from '../usuario/usuario.entity';

@Injectable()
export class AutorizacionService {
  usuarios: UsuarioEntity [] = [];

  buscarUsuario(nombreUsuarioABuscar: string): UsuarioEntity{
    return this.usuarios.find((usuario: UsuarioEntity) => usuario.nombreUsuario === nombreUsuarioABuscar);
  }
}