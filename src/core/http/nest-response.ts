export class NestResponse {
  status: number;
  headers: Object;
  body: Object;

  constructor(resposta: NestResponse) {
    // this.status = resposta.status; ...
    Object.assign(this, resposta);
  }
}
