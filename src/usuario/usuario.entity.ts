import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsNomeUsuarioUnico } from './is-nome-usuario-unico.validator';
import { Exclude, Expose } from 'class-transformer';

export class Usuario {
  id: number;

  @IsNotEmpty({
    message: 'nomeUsuario é obrigatório!',
  })
  @IsString({
    message: 'nomeUsuario precisa ser uma "string"!',
  })
  @IsNomeUsuarioUnico({
    message: 'nomeUsuario precisa ser único!',
  })
  @Expose({
    name: 'userName',
  })
  nomeUsuario: string;

  @IsEmail(
    {},
    {
      message: 'email precisa ser um endereço de email válido!',
    },
  )
  @Expose({
    name: 'email',
  })
  email: string;

  @IsNotEmpty({
    message: 'senha é obrigatório!',
  })
  @Exclude({
    toPlainOnly: true,
  })
  @Expose({
    name: 'password',
  })
  senha: string;

  @IsNotEmpty({
    message: 'nomeCompleto é obrigatório!',
  })
  @Expose({
    name: 'fullName',
  })
  nomeCompleto: string;

  @Expose({
    name: 'joinDate',
  })
  dataEntrada: Date;
}
