import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { NestResponse } from './nest-response';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

@Injectable()
export class TransformaRespostaInterceptor implements NestInterceptor {
  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((respostaDoControlador: NestResponse) => {
        if (respostaDoControlador instanceof NestResponse) {
          const contexto = context.switchToHttp();
          const resp = contexto.getResponse();
          const { headers, status, body } = respostaDoControlador;

          const nomesDosCabecalhos = Object.getOwnPropertyNames(headers);
          nomesDosCabecalhos.forEach((nomeDoCabecalho) => {
            const valorDoCabecalho = headers[nomeDoCabecalho];
            this.httpAdapter.setHeader(resp, nomeDoCabecalho, valorDoCabecalho);
          });

          this.httpAdapter.status(resp, status);

          return body;
        } else {
          return respostaDoControlador;
        }
      }),
    );
  }
}
