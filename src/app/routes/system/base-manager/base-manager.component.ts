import {Component, Injectable, OnInit} from '@angular/core';
import {APIResource} from '@core/utility/api-resource';
import {ApiService} from '@core/utility/api-service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import { ModalBaseComponent } from './modal-base.component';
import {CacheService} from '@delon/cache';


@Injectable()
export class RandomBaseService {
  randomBaseUrl = APIResource.AppModuleConfig;

  moduleServiceUrl = `${APIResource.AppModuleConfig}/_root/${APIResource.AppModuleConfig}?_recursive=true&_deep=4&_root.ApplyId=3935eb43532d435398d5189d5ece0f5d&_root.parentid=in("",null)`;
  getModuleTree(pageIndex = 1, pageSize = 2, sortField, sortOrder) {
    return this.http.get(`${this.moduleServiceUrl}` , {
      _page: pageIndex, _rows: pageSize, _orderBy: `${sortField} ${sortOrder}`
    } );
  }

  getModule(pageIndex, pageSize, sortField, sortOrder) {
    return this.http.getProj(`${this.randomBaseUrl}`, {
      _page: pageIndex, _rows: pageSize, _orderBy: `${sortField} ${sortOrder}`
    });
  }

    deleteModule(name?) {
       const ids = name.join(',');
       if( ids.length > 0 ) {
         return this.http.deleteProj(this.randomBaseUrl, { _ids: ids});
       }
    }

    updateModule(data?) {
     return this.http.putProj(this.randomBaseUrl, data);
    }

    addModule(data?) {
      return this.http.postProj(this.randomBaseUrl, data);
    }


  constructor(private http: ApiService) {
  }
}


@Component({
  selector: 'cn-base-manager, [base-manager]',
  providers: [ RandomBaseService ],
  templateUrl: './base-manager.component.html',
  styles: [
  `
    .table-operations {
      margin-bottom: 16px;
    }
    
    .table-operations > button {
      margin-right: 8px;
    }
    .selectedRow{
        color:blue;
    }
    `
]
})
export class BaseManagerComponent implements OnInit {

  _indeterminate = false;
  _allChecked = false;
  _current = 1;
  _pageSize = 10;
  _total = 1;
  _dataSet = [];
  _dataTree = [];
  _loading = true;
  _sortValue = 'Desc';
  _sortField = 'CreateTime';
  editCache = {};
  cacheMapData;
  editRow = null;
  tempEditObject = {};
  rowLine=null;
  // isVisible=false;

  // showModal(): void {
  //   this.isVisible = true;
  // }
  //
  // handleOk(): void {
  //   console.log('Button ok clicked!');
  //   this.isVisible = false;
  // }
  //
  // handleCancel1(): void {
  //   console.log('Button cancel clicked!');
  //   this.isVisible = false;
  // }
  sort(field , value) {
    this._sortValue = (value === 'descend') ? 'DESC' : 'ASC';
    this._sortField = field;
    this.refreshData();
  }

  reset() {
    this.refreshData(true);
  }

  constructor(
    private _randomBase: RandomBaseService,
    private cacheService: CacheService,
    public msgSrv: NzMessageService,
    private modalService: NzModalService) {
  }

  /**
   * 刷新数据
   * @param {boolean} reset
   */
  refreshData(reset = false) {
    if (reset) {
      this._current = 1;
    }
    this.cacheMapData = new Map();
    this._allChecked = false;
    this._loading = true;
    this._randomBase.getModule(this._current, this._pageSize, this._sortField, this._sortValue).toPromise().then((data: any) => {
      this._loading = false;
      this._total = data.Data.Total;
      this._dataSet = data.Data.Rows;

      this._dataSet.forEach(item => {
        this.cacheMapData.set(item.Id, {checked: false, dataItem: item});
      });
    }).then( () => {
      this._randomBase.getModuleTree(this._current, this._pageSize, this._sortField, this._sortValue).subscribe( (data:any) => {
        this._dataTree = this.arrayToTree(data.Data.Rows, '');
        this.cacheService.set('ModuleTree',this._dataTree);
      });
    } );
  }

    ngOnInit() {
      this.refreshData();
    }

  arrayToTree(data, parentid) {
    const result = [];
    let temp;
    for (let i = 0; i < data.length; i++) {
      if (data[i].ParentId == parentid || !data[i].ParentId) {
        const obj =
          { label: data[i].Name,
            value: data[i].Id
          };
        temp = this.arrayToTree(data[i].Children, data[i].Id);
        if (temp.length > 0) {
          obj['children'] = temp;
        } else {
          obj['isLeaf'] = true;
        }
        result.push(obj);
      }
    }
    return result;
  }

  refChecked() {
    const checkedCount = this._dataSet.filter(w => w.checked).length;
    this._allChecked = checkedCount === this._dataSet.length;
    this._indeterminate = this._allChecked ? false : checkedCount > 0;
  }

  /**
   * 全选操作
   * @private
   */
  _checkAll() {
    this._dataSet.forEach(item => item.checked = this._allChecked);
    this.cacheMapData.forEach( mpa =>{mpa.checked = this._allChecked});
  }

  /**
   * 当行选中操作
   * @param data
   */
    selectRow(data?){
      this._dataSet.forEach( item => {
        item.selected = false;
      });
      data.selected = true;
      this.cacheMapData.get(data.Id).checked = data.checked;
    }

  /**
   * 按钮刷新操作
   * @param event
   */
  refresh(event) {
      this.refreshData();
    }

  /**
   * 按钮新增操作
   * @param event
   */
  add(event) {
      let data={
        "ParentId": "0854a1ddc42d493e8e8aa41117924d08",
        "Order": 0,
        "CategoryId": "测试模块",
        "ApplyId": "3935eb43532d435398d5189d5ece0f5d",
        "ConfigData": "{\n  \"group\": false,\n  \"link\": \"/system\",\n  \"icon\": \"icon-speedometer\"\n}",
        "Name": "新测试模块"+ (Math.random() * 1000 | 2.2),
        "ShareScope": "Project",
        "Remark": "测试数据，可以任意处置！",
        "ProjId": "002905c7bf57c54c9e5e65ec0e5fafe8",
        "PlatCustomerId": "f2771e4c90db29439e3c986d9859dc74"
      };
      this._randomBase.addModule(data).subscribe( response => {
        if(response.Status === 200){
          this.msgSrv.success(response.Message ? response.Message : '添加成功！');
          this.refreshData();
        }else {
          this.msgSrv.error(response.Message);
        }
      });
    }

  /**
   * 行内新增操作 拿到服务器返回来新插入的数据进行编辑
   * @param event
   */
  add1(event) {
    this._randomBase.addModule().subscribe(response => {
      response.Data.ConfigData = JSON.stringify({group: false, link: 'system', icon: 'icon-speedometer'});
      this._dataSet = [ ...this._dataSet, response.Data];
      this.cacheMapData.set(response.Data.Id, {checked: false, dataItem: response.Data});
      this.edit(response.Data);
      this.rowLine = 'INSERT';
    });
  }

  /**
   * 行内新增操作 本地先进行数据组织，然后post如数据库中
   * @param event
   */
  add2(event) {
    let data = {
      ApplyId : "3935eb43532d435398d5189d5ece0f5d",
      CategoryId: "测试模块",
      Children: null,
      ConfigData :  JSON.stringify({group: false,  link: '/system',  icon: 'icon-speedometer'}),
      Id:    "9e695d7422aa43498654",
      Name:   "行内新测试模块643",
      Order:  0,
      ParentId:  "0854a1ddc42d493e8e8aa41117924d08",
      PlatCustomerId:  "f2771e4c90db29439e3c986d9859dc74",
      ProjId: "002905c7bf57c54c9e5e65ec0e5fafe8",
      Remark: "行内测试数据，可以任意处置！",
      ShareScope: "Project",
      selected:false,
      checked:false
    }

    this._dataSet = [ ...this._dataSet, data];
    this.cacheMapData.set(data.Id, {checked: false, dataItem: data});
    this.edit(data);
    this.rowLine = 'CACHE';
  }

  /**
   * 按钮编辑
   * @param event
   */
    update(event) {
      const data = this.getSelectItem();
      if(data.length === 1) {
        this._randomBase.updateModule(data);
        this.refreshData();
      }else if (data.length > 1 ){
          this.msgSrv.warning('不能修改多条记录！');
          //处理缓存选中的数据
      this.cacheMapData.forEach( item => {
        item.dataItem.checked = false;
        item.checked = false;
      });} else {
        this.msgSrv.warning('请选中要修改的记录！');
      }
    }

  /**
   * 按钮删除
   * @param event
   */
  delete(event) {
      const name = this.getSelectId();
      if(name.length >= 1) {
        this._randomBase.deleteModule(name).subscribe(response => {
          if (response.Status === 200) {
            this.msgSrv.success(response.Message);

            //移除缓存中的数据
            name.forEach( na =>{
              this.cacheMapData.delete(na);
            })
            this.refreshData();
          } else {
            this.msgSrv.error(response.Message);
          }
        });
      }else {
        this.msgSrv.success('请选中要删除的数据！');
      }
  }

  /**
   * 编辑按钮操作
   * @param data
   */
  edit(data){
      this.tempEditObject[ data.Id ] = { ...data };
      this.editRow = data.Id;
    }

  /**
   * 编辑状态取消操作
   * @param data
   */
  cancel(data){
      if(this.rowLine === 'INSERT'){
        this._dataSet.pop(); //移除最后一条记录
        this._randomBase.deleteModule([data.Id]).subscribe( () =>{ this.rowLine = null}); //删除数据库新增的数据
      }else if(this.rowLine === 'CACHE'){
        this._dataSet.pop();
      }

      this.tempEditObject[data.Id] = {};
      this.editRow = null;
      this.rowLine = null;
    }

  /**
   * 保存数据
   * @param data
   */
  save(data){
    if(data.Id && this.rowLine !== 'CACHE') {
      this._randomBase.updateModule(this.tempEditObject[data.Id]).subscribe(response => {
        this.msgSrv.success(response.Message ? response.Message : '操作成功');
        this.editRow = null;
        this.refreshData();
      });
    }else {
        delete this.tempEditObject[data.Id].Id;
        this._randomBase.addModule(this.tempEditObject[data.Id]).subscribe( response => {
        this.msgSrv.success(response.Message ? response.Message :  '操作成功');
        this.editRow = null;
        this.refreshData();
      });
    }
    this.rowLine = null;
  }

  /**
   * 行内删除数据
   * @param data
   */
    delete1(data) {
      this._randomBase.deleteModule([data.Id]).subscribe( response => {
        this.msgSrv.success(response.Message);
        this.refreshData();
      })
    }
  /**
   *获取选中记录的主键集合
   * @returns {any[]}
   */
    getSelectId() {
      const name = [] ;
      this.cacheMapData.forEach(item =>{
        if(item.checked){
          name.push(item.dataItem.Id);
        }
      })
      return name;
    }

  /**
   * 获取选中记录集合
   * @returns {any[]}
   */
    getSelectItem() {
      const data = [];
      this.cacheMapData.forEach(item => {
        if(item.checked){
          data.push(item.dataItem);
        }
      })
      return data;
    }

    showModalForComponent(flag?) {

      switch (flag) {
        case 'Add':
          this.confirmAddData()
          break;
        case 'Edit':
          this.confirmEditData( )
          break;
      }
    }

    confirmAddData()
    {
      const subscription = this.modalService.open({
        title          : '新增数据',
        content        : ModalBaseComponent,
        onOk() {
        },
        onCancel() {
          console.log('Click cancel');
        },
        footer         : false,
        componentParams: {
          name: '',
          tree: this._dataTree
        }
      });
      subscription.subscribe((result) => {
        // console.log(result);
        // console.log( typeof result);
        if(typeof result === 'object')
            this._randomBase.addModule(result).subscribe( response => {
              if(response.Status === 200){
                this.msgSrv.success(response.Message ? response.Message : '添加成功！');
                this.refreshData();
              }else {
                this.msgSrv.error(response.Message);
          }
        });
      });
    }

    confirmEditData()
    {
      let data = this.getSelectItem();
      if( data.length === 1) {
        // this._randomBase.updateModule(data);
        this.refreshData();
        const subscription = this.modalService.open({
          title          : '修改数据',
          content        : ModalBaseComponent,
          onOk() {
          },
          onCancel() {
            // console.log('Click cancel');
          },
          footer         : false,
          componentParams: {
            name: data[0],
            tree: this._dataTree
          }
        });
        subscription.subscribe(result => {
          if(typeof result === 'object'){
            result['Id'] = data[0].Id;
            this._randomBase.updateModule(result).subscribe( response => {
              if(response.Status === 200){
                this.msgSrv.success(response.Message ? response.Message : '修改成功！');
                this.refreshData();
              }else {
                this.msgSrv.error(response.Message);
              }
            });}
        });
      }else if (data.length > 1 ){
        this.msgSrv.warning('不能修改多条记录！');
        //处理缓存选中的数据
        this.cacheMapData.forEach( item => {
          item.dataItem.checked = false;
          item.checked = false;
        });} else {
        this.msgSrv.warning('请选中要修改的记录！');
      }
    }
}
