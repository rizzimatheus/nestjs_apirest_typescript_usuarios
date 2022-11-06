import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { IsNomeUsuarioUnicoConstraint } from './is-nome-usuario-unico.validator';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, IsNomeUsuarioUnicoConstraint],
})
export class UsuarioModule {}
