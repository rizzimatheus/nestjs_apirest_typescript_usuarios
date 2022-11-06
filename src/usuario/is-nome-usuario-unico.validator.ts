import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UsuarioService } from './usuario.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsNomeUsuarioUnicoConstraint
  implements ValidatorConstraintInterface
{
  constructor(private usuarioService: UsuarioService) {}

  validate(
    nomeUsuario: string,
    args: ValidationArguments,
  ): boolean | Promise<boolean> {
    return !!!this.usuarioService.buscaPorNomeUsuario(nomeUsuario);
  }
}

export function IsNomeUsuarioUnico(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNomeUsuarioUnicoConstraint,
    });
  };
}
