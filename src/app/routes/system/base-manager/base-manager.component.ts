import {Component, Injectable, OnInit} from '@angular/core';
import {APIResource} from '@core/utility/api-resource';
import {ApiService} from '@core/utility/api-service';
import {NzMessageService} from 'ng-zorro-antd';


@Injectable()
export class RandomBaseService {
  randomBaseUrl = APIResource.AppModuleConfig;

  getModule(pageIndex = 1, pageSize = 2, sortField, sortOrder) {
    return this.http.getProj(`${this.randomBaseUrl}`, {
      _page: pageIndex, _rows: pageSize, _orderBy: `${sortField} ${sortOrder}`
    });
  }

    deleteModule(name?)
    {
       let ids = name.join(',');
        return this.http.deleteProj(this.randomBaseUrl + '/' + ids);
    }

    updateModule(data?)
    {
      // if(data.length === 1)
      // {
      //  console.log('修改单挑', data[0]);
      // }else if(data.length >1) {
      //   console.log('修改批量', data);
      //   this.msgSrv.warning('修改不能进行批量操作');
      // }
      // else
      // {
      //   this.msgSrv.warning('没有要修改的数据');
      // }
    }

    addModule(data?)
    {
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
  _sortValue = 'asc';
  _sortField = 'order';
  editCache = {};

  items : {key:string,data:any}
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

    this.editCache = {};
    this._allChecked = false;
    this._loading = true;
    this._randomBase.getModule(this._current, this._pageSize, this._sortField, this._sortValue).subscribe((data: any) => {
      this._loading = false;
      this._total = data.Data.Total;
      this._dataSet = data.Data.Rows;

      this._dataSet.forEach(item => {
        if (!this.editCache[item.Id]) {
          this.editCache[item.Id] = {
            checked: false,
            dataItem: item
          };
        }
      });
    });
  }

    ngOnInit() {
      this.refreshData();
    }

  i = 100;


  refChecked() {
    const checkedCount = this._dataSet.filter(w => w.checked).length;
    this._allChecked = checkedCount === this._dataSet.length;
    this._indeterminate = this._allChecked ? false : checkedCount > 0;
  }

  _checkAll() {
    this._dataSet.forEach(item => item.checked = this._allChecked);
    for (let index in this.editCache) {
      this.editCache[index].checked = this._allChecked;
    }
  }

    selectRow(data?)
    {
      this._dataSet.forEach( item => {
        item.selected = false;
      });
      data.selected = true;
      this.editCache[data.Id].checked = data.checked;
    }

    refresh(event)
    {
      for (let item1 in this.editCache) {
        if(this.editCache[item1].checked)
        {
          console.log(333,this.editCache[item1].dataItem.Name);
        }
      }
      this.refreshData();
    }

    add(event)
    {
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
          this.refreshData()
        }else{
          this.msgSrv.error(response.Message);
        }
      });

    }

    update(event)
    {
      let data=[] ;
      for (let item1 in this.editCache) {
        if(this.editCache[item1].checked)
        {
          data.push(this.editCache[item1].dataItem);
        }
      }
      this._randomBase.updateModule(data);
    }

    delete(event)
    {
      let name = [] ;
      for (let item1 in this.editCache) {
        if(this.editCache[item1].checked)
        {
            name.push(this.editCache[item1].dataItem.Id);
        }
      }

      if(name.length >= 1) {
        this._randomBase.deleteModule(name).subscribe(response => {
          if (response.Status === 200) {
            this.msgSrv.success(response.Message);
            this.refreshData();
          } else {
            this.msgSrv.error(response.Message);
          }
        });
      }else
      {
        this.msgSrv.success('请选中要删除的数据！');
      }

}
}
