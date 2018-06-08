import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from '../usuario/usuario.entity';

@Injectable()
export class AutorizacionService {
  usuarios: UsuarioEntity [] = [
    {
    usuario: 'adrianeguez',
    password: '12345678910', }];

  validarUsuario(usuarioAValidar: UsuarioEntity): boolean{
    const usuarioRecuperado = this.usuarios.find((usuario: UsuarioEntity) => usuario.usuario === usuarioAValidar.usuario);
    if (usuarioRecuperado.password === usuarioAValidar.password) {
      return true;
    } else {
      return false;
    }
  }
}