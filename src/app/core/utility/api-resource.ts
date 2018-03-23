/**
 * Created by zhaoxinlei on 2018/3/23.
 */
export class APIResource {
  /**
   * 	组织机构树的节点
   * @type {string}
   */
  public static OrgNode = 'SinoForce.Data.OrgNode';
  /**
   * 资源类型
   * @type {string}
   */
  public static Resource_Type = 'SinoForce.Resource.ResourceType';
  /**
   * 平台通用数据分类
   * @type {string}
   */
  public static SysDataCategory = 'SinoForce.Data.SysDataCategory';
  /**
   * 	NULL
   * @type {string}
   */
  public static UserStatusLog = 'SinoForce.Data.UserStatusLog';
  /**
   * 排序字段
   * @type {string}
   */
  public static EntitySort = 'SinoForce.Resource.EntitySort';	//
  /**
   * 应用访问许可集
   * @type {string}
   */
  public static AppPermission = 'SinoForce.Data.AppPermission';	//
  /**
   * 平台通用数据分类连接关系
   * @type {string}
   */
  public static SysDataCategoryLink = 'SinoForce.Data.SysDataCategoryLink';	//
  /**
   * 资源访问令牌
   * @type {string}
   */
  public static AccessToken = 'SinoForce.Data.AccessToken';	//
  /**
   * 组织机构与用户关系表
   * @type {string}
   */
  public static OrgUserLink = 'SinoForce.Data.OrgUserLink';	//
  /**
   * 应用配置包
   * @type {string}
   */
  public static AppConfigPack = 'SinoForce.Data.AppConfigPack';	//
  /**
   * 用户信息
   * @type {string}
   */
  // 新建资源类型	新建资源类型
  public static AppUser = 'SinoForce.Data.AppUser';	//
  /**
   * 在线用户信息
   * @type {string}
   */
  public static OnlineUser = 'SinoForce.Data.OnlineUser';	//
  /**
   *
   * @type {string}
   */
  public static DynamicResExtend = 'SinoForce.Resource.DynamicResExtend';
  /**
   * 应用程序模板描述信息
   * @type {string}
   */
  public static AppTemplate = 'SinoForce.Template.AppTemplate';	//
  /**
   * SQL脚本、存储过程、函数等数据库对象的完整配置
   * @type {string}
   */
  public static DbCommonConfig = 'SinoForce.Resource.DbCommandConfig';	//
  /**
   * 在线用户信息视图
   * @type {string}
   */
  public static OnlineUserInfo = 'SinoForce.User.OnlineUserInfo';	//
  /**
   * 一般非结构化数据
   * @type {string}
   */
  public static UnstructData = 'SinoForce.Data.UnstructData';	//
  /**
   * 角色访问权限信息
   * @type {string}
   */
  public static PrivRole = 'SinoForce.Data.PrivRole';	//
  /**
   * 多对多关系的中间表
   * @type {string}
   */
  public static EntituyRelation = 'SinoForce.Resource.EntityRelation';
  /**
   *
   * @type {string}
   */
  public static AppProject = 'SinoForce.Data.AppProject';	// 应用项目
  /**
   * 动态资源模块
   * @type {string}
   */
  public static DynamicResModule = 'SinoForce.Resource.DynamicResModule';
  /**
   * 关联表
   * @type {string}
   */
  public static EntityRelevance = 'SinoForce.Resource.EntityRelevance';
  /**
   * 平台客户信息
   * @type {string}
   */
  public static PlatformCustomer = 'SinoForce.Data.PlatformCustomer';
  /**
   * 用户令牌生命周期
   * @type {string}
   */
  public static TokenLife = 'SinoForce.Data.TokenLife';
  /**
   * 权限主体与角色的关系表
   * @type {string}
   */
  public static PrivRoleLink = 'SinoForce.Data.PrivRoleLink';
  /**
   * 索引信息
   * @type {string}
   */
  public static EntityIndex = 'SinoForce.Resource.EntityIndex';
  /**
   * 树表
   * @type {string}
   */
  public static EntityTree = 'SinoForce.Resource.EntityTree';
  /**
   * 实体属性描述信息
   * @type {string}
   */
  public static EntityPropertyDefine = 'SinoForce.Data.EntityPropertyDefine';
  /**
   * 验证码
   * @type {string}
   */
  public static ValidCode = 'SinoForce.User.ValidCode';
  /**
   *
   * @type {string}
   */
  public static SysCommonCode = 'SinoForce.Data.SysCommonCode';
  /**
   * 受限资源描述信息
   * @type {string}
   */
  public static PrivilegedResource = 'SinoForce.Data.PrivilegedResource';
  /**
   * 应用项目模块描述信息
   * @type {string}
   */
  public static AppModuleConfig = 'SinoForce.AppProject.AppModuleConfig';


  /**
   * 配置平台标识代码
   * @type {string}
   */
  public static SettingCommonCode = '{WEB前端标识}';

  /**
   * 配置平台URL
   * @type {string}
   */

  public static SettingUrl = 'http://192.168.1.8:8016/f277/Res/';

  /**
   * 解析平台标识代码
   * @type {string}
   */
  public static LoginCommonCode = '{WEB应用运行平台}';

  /**
   * 解析平台URL
   * @type {string}
   */
  public static LoginUrl = 'http://192.168.1.8:8016/eb43/Res/';


  public static localUrl =  'http://localhost:4200/assets/app-data.json';
}
