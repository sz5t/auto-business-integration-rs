import {Component, Injectable, OnInit} from '@angular/core';
import {APIResource} from '@core/utility/api-resource';
import {ApiService} from '@core/utility/api-service';
import {NzMessageService} from 'ng-zorro-antd';
import {AppModuleConfig} from '../../../model/APIModel/AppModuleConfig';
import {CommonUtility} from '@core/utility/common-utility';


@Injectable()
export class RandomBaseService {
  randomBaseUrl = APIResource.AppModuleConfig;

  getModule(pageIndex, pageSize, sortField, sortOrder) {
    return this.http.getProj(`${this.randomBaseUrl}`, {
      _page: pageIndex, _rows: pageSize, _orderBy: `${sortField} ${sortOrder}`
    });
  }

    deleteModule(name?) {
       const ids = name.join(',');
        return this.http.deleteProj(this.randomBaseUrl + '/' + ids);
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
  _loading = true;
  _sortValue = 'Desc';
  _sortField = 'CreateTime';
  editCache = {};
  cacheMapData;
  editRow = null;
  tempEditObject = {};

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
    public msgSrv: NzMessageService) {
  }

  refreshData(reset = false) {
    if (reset) {
      this._current = 1;
    }

    this.cacheMapData = new Map();
    this._allChecked = false;
    this._loading = true;
    this._randomBase.getModule(this._current, this._pageSize, this._sortField, this._sortValue).subscribe((data: any) => {
      this._loading = false;
      this._total = data.Data.Total;
      this._dataSet = data.Data.Rows;

      this._dataSet.forEach(item => {
        this.cacheMapData.set(item.Id, {checked: false, dataItem: item});
      });
    });
  }

    ngOnInit() {
      this.refreshData();
    }

  refChecked() {
    const checkedCount = this._dataSet.filter(w => w.checked).length;
    this._allChecked = checkedCount === this._dataSet.length;
    this._indeterminate = this._allChecked ? false : checkedCount > 0;
  }

  _checkAll() {
    this._dataSet.forEach(item => item.checked = this._allChecked);
    this.cacheMapData.forEach( mpa =>{mpa.checked = this._allChecked});
  }

    selectRow(data?){
      this._dataSet.forEach( item => {
        item.selected = false;
      });
      data.selected = true;
      this.cacheMapData.get(data.Id).checked = data.checked;
    }

    refresh(event) {
      this.refreshData();
    }

    add(event) {
      let data={
        "ParentId": "0854a1ddc42d493e8e8aa41117924d08",
        "Order": 0,
        "CategoryId": "测试模块",
        "ApplyId": "3935eb43532d435398d5189d5ece0f5d",
        "ConfigData": "{\n  \"group\": false,\n  \"link\": \"/system\",\n  \"icon\": \"icon-speedometer\"\n}",
        "Children": null,
        "Name": "新测试模块"+ (Math.random() * 1000 | 2.2),
        "ShareScope": "Project",
        "Remark": "测试数据，可以任意处置！",
        "ProjId": "002905c7bf57c54c9e5e65ec0e5fafe8",
        "PlatCustomerId": "f2771e4c90db29439e3c986d9859dc74",
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

  add1(event)
  {
    this._randomBase.addModule().subscribe(response => {
      response.Data.ConfigData = JSON.stringify({group: false, link: 'system', icon: 'icon-speedometer'});
      this._dataSet = [ ...this._dataSet, response.Data];
      this.cacheMapData.set(response.Data.Id, {checked: false, dataItem: response.Data});
      this.edit(response.Data);
    });

    // var module = new AppModuleConfig();
    // module.Id='asdfasdfasf'
    //   this._dataSet = [ ...this._dataSet, module];
    //   this.cacheMapData.set(module.Id, {checked: false, dataItem: module});
    //   this.edit(module);
  }

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

  edit(data){
    this.tempEditObject[ data.Id ] = { ...data };
    this.editRow = data.Id;
    console.log(111, data.Id, this.tempEditObject);
  }

  cancel(data){
    this.tempEditObject[data.Id] = {};
    this.editRow = null;
  }

  save(data){
    if(data.Id) {
      this._randomBase.updateModule(this.tempEditObject[data.Id]).subscribe(response => {
        this.msgSrv.success(response.Message ? '操作成功' : response.Message);
        this.editRow = null;
        this.refreshData();
      });
    }else {
      console.log(222,data);
    }
  }

  delete1(data)
  {
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
}
