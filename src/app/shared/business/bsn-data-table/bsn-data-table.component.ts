import { Component, OnInit,Input } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { CommonUtility } from '@core/utility/Common-utility';

@Component({
    selector: 'bsn-data-table,[bsn-data-table]',
    templateUrl: './bsn-data-table.component.html',
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
export class BsnDataTableComponent implements OnInit {

    @Input() config; //dataTables 的配置参数
    @Input() dataList=[]; // 表格数据集合
   

    pi = 1;
    ps = 10;
    total = 5; // mock total
    loading = false;
    args: any = {};
    _indeterminate = false;
    _allChecked = false;
    events: any[] = [];
    rowContent={}; //行填充
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
                this.dataList = data.results;
            }); */
    }

    clear() {
        this.args = {};
        this.load(1);
    }

    _checkAll() {
        this.dataList.forEach(item => item.checked = this._allChecked);
        this.refChecked();
    }
    refChecked() {
        const checkedCount = this.dataList.filter(w => w.checked).length;
        this._allChecked = checkedCount === this.dataList.length;
        this._indeterminate = this._allChecked ? false : checkedCount > 0;
    }
    //private _randomUser: RandomUserService,
    constructor(private http: _HttpClient, private message: NzMessageService, private modalService: NzModalService) {
    }
    ngOnInit() {
        //this.load();
        //  this.http.get('/chart/visit').subscribe((res: any) => this.events = res);
        this.getContent(); //调用方法获取到行内填充数据格式
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
        const index = this.dataList.findIndex(item => item.key === key);
        this.dataList[index] = this.editCache[key].data;
        this.editCache[key].edit = false;
    }

    deleteEdit(i: string): void {
        const dataSet = this.dataList.filter(d => d.key !== i);
        this.dataList = dataSet;
    }
    updateEditCache(): void {
       // const datadataList=JSON.parse(JSON.stringify(this.dataList));
        this.dataList.forEach(item => {
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
   // copyData = [...this.dataList];
    sortMap = { };
    /**
     * 排序 
     */
    sort(sortName, value) {
        this.sortName = sortName;
        this.sortValue = value;
        Object.keys(this.sortMap).forEach(key => {
            if (key !== sortName) {
                this.sortMap[key] = null;
            } else {
                this.sortMap[key] = value;
            }
        });
        this.search();
    }
    /**
     * 查询
     */
    search() {

        this.dataList = [...this.dataList.sort((a, b) => {
            if (a[this.sortName] > b[this.sortName]) {
                return (this.sortValue === 'ascend') ? 1 : -1;
            } else if (a[this.sortName] < b[this.sortName]) {
                return (this.sortValue === 'ascend') ? -1 : 1;
            } else {
                return 0;
            }
        })];
    }

    /**
     * 获取行内编辑是行填充数据
     */
    getContent(){
        this.rowContent["key"]=null;
        this.config.columns.forEach(element => {
            const colsname=element.field.toString();
            this.rowContent[colsname]="";
        });
    }

    /**新增 */
    addRow(): void {
        const rowContentNew=JSON.parse(JSON.stringify(this.rowContent));
        const fieldIdentity = CommonUtility.uuID(6);
        rowContentNew["key"]=fieldIdentity;
        rowContentNew["checked"]=true;
        this.dataList = [...this.dataList, rowContentNew];
        //this.dataList.push(this.rowContent);
        console.log('key',   fieldIdentity);
        console.log('数据集',   this.dataList);
        this.updateEditCache();
        this.startEdit(fieldIdentity.toString());

    }
    /**修改 */
    updateRow(): void {
        this.dataList.forEach(item => {
            if (item.checked === true) {
                this.startEdit(item.key);
            }
        });
    }
    /**删除 */
    deleteRow(): void {
        this.modalService.confirm({
            title: '确认框',
            content: '确认要删除？',
            onOk: () => {
                this.dataList.forEach(item => {
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
        this.dataList.forEach(item => {
            if (item.checked === true) {
                this.saveEdit(item.key);
            }
        });
    }
    /**取消 */
    cancelRow(): void {
        this.dataList.forEach(item => {
            if (item.checked === true) {
                this.cancelEdit(item.key);
            }
        });
    }
    /**
     * 选中行
     * @param data 
     * @param edit 
     */
    selectRow(data?, edit?) {
         this.dataList.forEach(item => {
            item.selected=false;
        });
        data.selected=true;// 行选中
        // 单选(check=select)，如果是未勾选，第一次点击选中，再次点击取消选中
        // 多选（check=select），如果是未勾选，第一次点击选中，再次点击取消选中
        // 多勾选单选中行（check》select）勾选和行选中各自独立，互不影响
    }

    userNameChange(data?) {
        console.log('子页面', data);
        const index = this.dataList.findIndex(item => item.key === data.key);
        this.editCache[data.key].data[data.name]=data.data;
    }

    /**
     * 动态执行方法
     * @param name 
     */
    execFun(name?) {
        switch (name) {
            case 'refresh':
                this.refresh()
                break;
            case 'addRow':
                this.addRow()
                break;
            case 'updateRow':
                this.updateRow()
                break;
            case 'deleteRow':
                this.deleteRow()
                break;
            case 'saveRow':
                this.saveRow()
                break;
            case 'cancelRow':
                this.cancelRow()
                break;
            default:
                break;
        }
    }

    /**
     * 刷新
     */
    refresh() {

    }


}
