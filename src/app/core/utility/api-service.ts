import {HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';
import {Inject} from '@angular/core';
import {DA_SERVICE_TOKEN, ITokenService} from '@delon/auth';


export  class ApiService
{

  constructor(
    @Inject(DA_SERVICE_TOKEN)
    private tokenService: ITokenService,
    private httpClient: HttpClient){}


  setHeaders() {
    const token = this.tokenService.get().token;
    if ( token !== 'unll') {
      // const userToken = JSON.parse(this.tokenService.get().token);
      return new HttpHeaders()
        .set('Credential', token ? token : '')
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

  postProj(resource , body?, params?) {
  let param: HttpParams = this.setParamsProj(params)
  return this.httpClient.request<any>(
    'POST',
    resource,
    {
      body: body,
      params: param,
      headers: this.setHeaders()
    } );
}


  getProj(resource, params?) {
     params  = this.setParamsProj(params);
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
   * 添加访问业务系统是必须的参数信息
   * @param param
   * @returns {HttpParams}
   */
  setParamsProj(param?): HttpParams {
    var httpParam = new HttpParams()
      .set('ProjId', '002905c7bf57c54c9e5e65ec0e5fafe8') //项目ID
      .set('ApplyId', '3935eb43532d435398d5189d5ece0f5d') //ApplyId
      .set('PlatCustomerId', 'f2771e4c90db29439e3c986d9859dc74');// PlatCutomerId

    for(let p in param) {
      httpParam = httpParam.set(p, param[p]);
    }
    return httpParam;
  }

  //endregion

}
