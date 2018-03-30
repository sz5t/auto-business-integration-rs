/**
 * Created by zhaoxinlei on 2018/3/23.
 */
import construct = Reflect.construct;

export class AppModuleConfig{

  constructor(uid?)
  {
    this.Id = uid;
  }
  ParentId;
  Order;
  CategoryId;
  ApplyId;
  ConfigData;
  Children;
  Name;
  ShareScope;
  Remark;
  ProjId;
  PlatCustomerId;
  Id;
  checked?;
}
