import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject} from '@angular/core';
import {DA_SERVICE_TOKEN, ITokenService} from '@delon/auth';
import {HttpParams} from '@angular/common/http/src/params';

export  class ApiService
{
  constructor(
    @Inject(DA_SERVICE_TOKEN)
    private tokenService: ITokenService,
    private httpClient: HttpClient){}


  setHeaders() {
    const token = this.tokenService.get().token;
    // console.log(22222,token)
    if ( token !== 'unll') {
      const userToken = JSON.parse(this.tokenService.get().token);
      return new HttpHeaders()
        .set('Credential', userToken['Token'] ? userToken['Token'] : '')
        .set('X-Requested-With', 'XMLHttpRequest')
        .set('Cache-Control', 'no-cache');
    }
  }

  //region 操作配置平台的相关资源
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
  //endregion

  //region  操作项目配置的相关api
  postProj(resource  , body?, params?) {
    params = this.setParamsProj(params);
    return this.httpClient.request<any>(
      'POST',
      resource,
      {
        body: body,
        params: params,
        headers: this.setHeaders()
      } );
  }


  getProj(resource, params?: HttpParams) {

      params = this.setParamsProj(params);
        return this.httpClient.request<any>(
      'GET',
      resource,
      {
        responseType: 'json',
        params: params,
        headers: this.setHeaders()

      });
  }

  putProj(resource, params?, body?) {
    params = this.setParamsProj(params);
    return this.httpClient.request<any>(
      'PUT',
      resource,
      {
        params: params,
        body: body,
        headers: this.setHeaders()
      });
  }

  deleteProj(resource, params?){
    params = this.setParamsProj(params);
    return this.httpClient.request<any>(
      'DELETE',
      resource,
      {
        params: params,
        headers: this.setHeaders()
      });
  }

  /**
   * 添加默认参数
   * @param {HttpParams} param
   * @returns {HttpParams}
   */
  setParamsProj(param: HttpParams): HttpParams
  {
    return param.set('ProjId', '002905c7bf57c54c9e5e65ec0e5fafe8') //项目ID
      .set('ApplyId', '3935eb43532d435398d5189d5ece0f5d') //ApplyId
      .set('PlatCustomerId', 'f2771e4c90db29439e3c986d9859dc74');// PlatCutomerId
  }
  //endregion

}
