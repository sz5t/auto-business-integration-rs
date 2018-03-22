import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject} from '@angular/core';
import {DA_SERVICE_TOKEN, ITokenService} from '@delon/auth';

export  class ApiService
{
  constructor(
    @Inject(DA_SERVICE_TOKEN)
    private tokenService: ITokenService,
    private httpClient: HttpClient){}


  setHeaders() {
    let token = this.tokenService.get().token;
    if(token !== 'unll') {
      const userToken = JSON.parse(this.tokenService.get().token);
      return new HttpHeaders()
        .set('Credential', userToken['Token'] ? userToken['Token'] : '')
        .set('X-Requested-With', 'XMLHttpRequest')
        .set('Cache-Control', 'no-cache');
    }
  }

  post(resource  , body?, params?) {
  return this.httpClient.request<any>(
    'POST',
    resource,
    {
      body: body,
      params: params,
      headers: this.setHeaders()
    } );
  }


  get(resource, params?) {
    return this.httpClient.request<any>(
      'GET',
      resource,
      {
        responseType: 'json',
        params: params,
        headers: this.setHeaders()

      });
  }

  put(resource, params?, body?) {
    return this.httpClient.request<any>(
      'PUT',
      resource,
      {
        params: params,
        body: body,
        headers: this.setHeaders()
      });
  }

  delete(resource, params?){
    return this.httpClient.request<any>(
      'DELETE',
      resource,
      {
        params: params,
        headers: this.setHeaders()
      });
  }

}
