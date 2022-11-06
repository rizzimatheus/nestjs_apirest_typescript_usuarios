import { Injectable } from '@nestjs/common';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  private usuarios: Array<Usuario> = [
    {
      id: 1,
      nomeUsuario: 'mrizzi',
      email: 'mrizzi@gmail.com',
      senha: '123456',
      nomeCompleto: 'Matheus Rizzi',
      dataEntrada: new Date(),
    },
  ];

  public cria(usuario: Usuario): Usuario {
    this.usuarios.push(usuario);
    return usuario;
  }

  public buscaPorNomeUsuario(nomeUsuario: string): Usuario {
    return this.usuarios.find(usuario => usuario.nomeUsuario == nomeUsuario);
  }
}
