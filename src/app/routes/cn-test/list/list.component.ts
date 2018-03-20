import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { map } from 'rxjs/operators';
//import { RandomUserService } from '../randomUser.service';
@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
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
export class ListComponent implements OnInit {

    /*   constructor(
          private http: _HttpClient
      ) { }
  
      ngOnInit() {
      } */


    pi = 1;
    ps = 10;
    total = 200; // mock total
    list = [];
    loading = false;
    args: any = {};
    _indeterminate = false;
    _allChecked = false;

    events: any[] = [];

    tested={
        'type': 'input',
        'labelSize': '6',
        'controlSize': '10',
        'inputType': 'text',
        'name': 'userName',
    };

    load(pi?: number) {
        if (typeof pi !== 'undefined') {
            this.pi = pi || 1;
        }

        this.loading = true;
        this._allChecked = false;
        this._indeterminate = false;
        /* this._randomUser.getUsers(this.pi, this.ps, this.args)
            .pipe(
                map(data => {
                    data.results.forEach(item => {
                        item.checked = false;
                        item.price = +((Math.random() * (10000000 - 100)) + 100).toFixed(2);
                    });
                    return data;
                })
            )
            .subscribe(data => {
                this.loading = false;
                this.list = data.results;
            }); */

        this.list = []; //liu
    }

    clear() {
        this.args = {};
        this.load(1);
    }

    _checkAll() {
        this.list.forEach(item => item.checked = this._allChecked);
        this.refChecked();
    }
    refChecked() {
        const checkedCount = this.list.filter(w => w.checked).length;
        this._allChecked = checkedCount === this.list.length;
        this._indeterminate = this._allChecked ? false : checkedCount > 0;
    }
    //private _randomUser: RandomUserService,
    constructor(private http: _HttpClient, private message: NzMessageService, private modalService: NzModalService) {
    }

    ngOnInit() {
        this.load();
        //  this.http.get('/chart/visit').subscribe((res: any) => this.events = res);
        for (let i = 0; i < 5; i++) {
            this.list.push({
                key: i.toString(),
                name: `Edrward ${i}`,
                age: 32,
                address: `London Park no. ${i}`,
                style:''
            });
        }
        this.updateEditCache();
    }

    showMsg(msg: string) {
        this.message.info(msg);
    }



    /**
     * 行内编辑
     */
    i = 100;
    editCache = {};

    startEdit(key: string): void {
        this.editCache[key].edit = true;
    }

    cancelEdit(key: string): void {
        this.editCache[key].edit = false;
    }

    saveEdit(key: string): void {
        const index = this.list.findIndex(item => item.key === key);
        this.list[index] = this.editCache[key].data;
        this.editCache[key].edit = false;
    }

    deleteEdit(i: string): void {
        const dataSet = this.list.filter(d => d.key !== i);
        this.list = dataSet;
    }


    updateEditCache(): void {
        this.list.forEach(item => {
            if (!this.editCache[item.key]) {
                this.editCache[item.key] = {
                    edit: false,
                    data: item
                };
            }
        });
    }
    /**排序 */
    sortName = null;
    sortValue = null;
    // sort(sort: { key: string, value: string }): void {
    //     this.sortName = sort.key;
    //     this.sortValue = sort.value;
    //     this.search();
    //   }
    // search(): void {
    //     /** filter data **/
    //     const filterFunc = item => (this.searchAddress ? item.address.indexOf(this.searchAddress) !== -1 : true) && (this.listOfSearchName.length ? this.listOfSearchName.some(name => item.name.indexOf(name) !== -1) : true);
    //     const data = this.data.filter(item => filterFunc(item));
    //     /** sort data **/
    //     if (this.sortName) {
    //       this.list = this.list.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
    //     } else {
    //       this.list = this.list;
    //     }
    //   }

      copyData = [ ...this.list ];
      sortMap = {
        name   : null,
        age    : null,
        address: null
      };
        sort(sortName, value) {
          this.sortName = sortName;
          this.sortValue = value;
          Object.keys(this.sortMap).forEach(key => {
            if (key !== sortName) {
              this.sortMap[ key ] = null;
            } else {
              this.sortMap[ key ] = value;
            }
          });
          this.search();
        }
        search() {
         
            this.list = [ ...this.list.sort((a, b) => {
              if (a[ this.sortName ] > b[ this.sortName ]) {
                return (this.sortValue === 'ascend') ? 1 : -1;
              } else if (a[ this.sortName ] < b[ this.sortName ]) {
                return (this.sortValue === 'ascend') ? -1 : 1;
              } else {
                return 0;
              }
            }) ];
          }

    /**新增 */
    addRow(): void {
        this.i++;
        this.list = [...this.list, {
            key: `${this.i}`,
            name: `Edward King ${this.i}`,
            age: '32',
            address: `London, Park Lane no. ${this.i}`,
            checked:true,
            style:''
        }];
        this.updateEditCache();
        this.startEdit(this.i.toString());
      
    }
    /**修改 */
    updateRow(): void {
        this.list.forEach(item => {
            if (item.checked === true) {
                this.startEdit(item.key);
            }
        });

    }
    /**删除 */
    deleteRow(): void {
        /*        this.modalService.confirm({
                   nzTitle: 'Are you sure delete this task?',
                   nzContent: '<b style="color: red;">Some descriptions</b>',
                   nzOkText: 'Yes',
                   nzOkType: 'danger',
                   nzOnOk: () => console.log('OK'),
                   nzCancelText: 'No',
                   nzOnCancel: () => console.log('Cancel')
                 }); */
        this.modalService.confirm({
            title: '确认框',
            content: '确认要删除？',
            onOk:()=> {
                this.list.forEach(item => {
                    if (item.checked === true) {
                        this.deleteEdit(item.key);
                    }
                });
            },
            onCancel() {
            }
        });
       
    }
    /**保存 */
    saveRow(): void {
        this.list.forEach(item => {
            if (item.checked === true) {
                this.saveEdit(item.key);
            }
        });
    }
    /**取消 */
    cancelRow(): void {
        this.list.forEach(item => {
            if (item.checked === true) {
                this.cancelEdit(item.key);
            }
        });

        console.log('取消后',this.list);
    }


    selectRow(data?,edit?) {
        data.style='selectedRow';
        // data.checked="true"; // 行勾选
        // data.selected="true";// 行选中

        // 单选(check=select)，如果是未勾选，第一次点击选中，再次点击取消选中
        // 多选（check=select），如果是未勾选，第一次点击选中，再次点击取消选中
        // 多勾选单选中行（check》select）勾选和行选中各自独立，互不影响
        console.log('行',data);
        console.log('update',edit);

    }

}
