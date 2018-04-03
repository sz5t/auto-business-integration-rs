import { Component, OnInit, Input } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { CommonUtility } from '@core/utility/Common-utility';
import { ApiService } from '@core/utility/api-service';
import { APIResource } from '@core/utility/api-resource';
import { RelativeService } from '@core/relative-Service/relative-service';

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
    @Input() dataList = []; // 表格数据集合


    pi = 1;
    ps = 10;
    total = 0; // mock total
    loading = false;
    args: any = {};
    _indeterminate = false;
    _allChecked = false;
    events: any[] = [];
    rowContent = {}; //行填充

    tempParameters = {
    };//临时参数，如从外部进出值，均从此处走

    /**
     * 当前组件属性【作为主表、作为子表、单表】优先级：子表-》主表-》单表；
     */
    componentType = {
        parent: false,
        child: false,
        own: true
    };
    /**
     * 事件API
     */
    _formEvent = {
        selectRow: [],
        reLoad: [],     
        selectRowBySetValue:[]
    };



    async load(type?, pi?: number) {
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
        }); 
        */
        if (type == "load") {
            const ajaxData = await this.execAjax(this.config.ajaxConfig, null, 'load');
            if (ajaxData) {
                console.log("异步加载表数据load", ajaxData);
                this.loading = true;
                if (ajaxData.Data.length > 0) {
                    if (ajaxData.Data[0].Metadata) {
                        this.updateEditCacheByLoad(JSON.parse(ajaxData.Data[0].Metadata));
                        this.dataList = JSON.parse(ajaxData.Data[0].Metadata);
                        this.total = this.dataList.length;
                    }
                    else {
                        this.dataList = [];
                        this.updateEditCacheByLoad([]);
                        this.total = this.dataList.length;
                    }
                    this.tempParameters["_id"] = ajaxData.Data[0].Id;
                }
                else {
                    this.dataList = [];
                    this.updateEditCacheByLoad([]);
                    this.tempParameters["_id"] && delete this.tempParameters["_id"];

                }
                console.log("当前记录id", this.tempParameters["_id"]);
            } else {
                this.dataList = [];
                this.updateEditCacheByLoad([]);
            }
        }

        // this.updateEditCache();
        /*   this._http.getProj(APIResource[p.url], params).subscribe(data => {
              console.log("异步加载表数据", data);
              this.loading = false;
              //this.dataList = data.Data.Metadata;
              //this.total=data.Data.Metadata.length;
          }); */

    }
    isString(obj) { //判断对象是否是字符串  
        return Object.prototype.toString.call(obj) === "[object String]";
    }
    /**
     * 执行异步数据
     * @param p 路由参数信息
     * @param ajaxType 异步请求类别，post、put、get
     * @param componentValue 
     */
    async execAjax(p?, componentValue?, type?) {
        const params = {
        };
        /*   p = {
              url: 'AppConfigPack',
              ajaxType:'post',
              params: [
                  { name: 'id', type: 'tempValue', valueName: '取值参数名称', value: '' },
                  { name: 'id', type: 'value', valueName: '取值参数名称', value: '' },
                  { name: 'id', type: 'componentValue', valueName: '取值参数名称', value: '' }
              ]
          } */
        let url;
        let tag = true;
        if (p) {
            p.params.forEach(param => {
                if (param.type == 'tempValue') {
                    if (type) {
                        if (type === 'load') {
                            if (this.tempParameters[param.valueName]) {
                                params[param.name] = this.tempParameters[param.valueName];
                            }
                            else {
                                console.log("参数不全不能加载");
                                tag = false;
                                return;
                            }
                        }
                        else {
                            params[param.name] = this.tempParameters[param.valueName];
                        }
                    }
                    else {
                        params[param.name] = this.tempParameters[param.valueName];
                    }

                }
                else if (param.type == 'value') {

                    params[param.name] = param.value;

                }
                else if (param.type == 'GUID') {
                    const fieldIdentity = CommonUtility.uuID(10);
                    params[param.name] = fieldIdentity;
                }
                else if (param.type == 'componentValue') {
                    params[param.name] = componentValue.value;
                }
            });


            if (this.isString(p.url)) {
                url = APIResource[p.url]
            }
            else {
                let pc = 'null';
                p.url.params.forEach(param => {
                    if (param["type"] === 'value') {
                        pc = param.value;
                    }
                    else if (param.type == 'GUID') {
                        const fieldIdentity = CommonUtility.uuID(10);
                        pc = fieldIdentity;
                    }
                    else if (param.type == 'componentValue') {
                        pc = componentValue.value;
                    }
                    else if (param.type == 'tempValue') {
                        pc = this.tempParameters[param.valueName];
                    }
                });

                url = APIResource[p.url["parent"]] + "/" + pc + "/" + APIResource[p.url["child"]];
            }
        }
        if (p.ajaxType === 'get' && tag) {
            console.log("get参数", params);

            return this._http.getProj(url, params).toPromise();
        }
        else if (p.ajaxType === 'put') {
            console.log("put参数", params);
            return this._http.putProj(url, params).toPromise();
        }
        else if (p.ajaxType === 'post') {
            console.log("post参数", params);
            return this._http.postProj(url, params).toPromise();
        }
        else {
            return null;
        }
    }

    clear() {
        this.args = {};
        this.load('', 1);
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
    constructor(private http: _HttpClient, private _http: ApiService,
        private message: NzMessageService, private modalService: NzModalService,
        private relativeMessage: RelativeService
    ) {
    }
    async ngOnInit() {
        this.analysisRelation(this.config);
        if (this.config.ajaxConfig) {
            if (this.config.componentType) {
                if (!this.config.componentType.child) {
                    this.load("load");
                }
            }
            else {
                this.load("load");
            }
        } else {
            this.updateEditCache();
            this.total = this.dataList.length;
        }
        //  this.http.get('/chart/visit').subscribe((res: any) => this.events = res);
        this.getContent();


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
        const index = this.dataList.findIndex(item => item.key === key);
        this.editCache[key].edit = false;
        this.editCache[key].data = JSON.parse(JSON.stringify(this.dataList[index]));
    }

    saveEdit(key: string): void {
        const index = this.dataList.findIndex(item => item.key === key);
        let checked = false;
        let selected = false;
        if (this.dataList[index].checked) {
            checked = this.dataList[index].checked;
        }
        if (this.dataList[index].selected) {
            selected = this.dataList[index].selected;
        }

        this.dataList[index] = this.editCache[key].data;
        this.dataList[index].checked = checked;
        this.dataList[index].selected = selected;

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
    updateEditCacheByLoad(dataList): void {
        // const datadataList=JSON.parse(JSON.stringify(this.dataList));
        dataList.forEach(item => {
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
    sortMap = {};
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

    getContent() {
        this.rowContent["key"] = null;
        this.config.columns.forEach(element => {
            const colsname = element.field.toString();
            this.rowContent[colsname] = "";
        });
    }

    /**新增 */
    addRow(): void {
        const rowContentNew = JSON.parse(JSON.stringify(this.rowContent));
        const fieldIdentity = CommonUtility.uuID(6);
        rowContentNew["key"] = fieldIdentity;
        rowContentNew["checked"] = true;
        this.dataList = [...this.dataList, rowContentNew];
        //this.dataList.push(this.rowContent);
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
    async  saveRow() {


        this.dataList.forEach(item => {
            if (item.checked === true) {
                this.saveEdit(item.key);
            }
        });
        const dataList = JSON.parse(JSON.stringify(this.dataList));
        const newdataList = [];
        dataList.forEach(element => {
            let row = {};
            for (const d in element) {
                if (d != 'checked' && d != 'selected') {
                    row[d] = element[d];
                }
            }
            newdataList.push(row);
        });
        this.tempParameters["dataList"] = JSON.stringify(newdataList);
        this.tempParameters["arrayDataList"] = newdataList;
        console.log(this.tempParameters["dataList"]);
        if (this.config.toolbar) {
            const index = this.config.toolbar.findIndex(item => item.name === "saveRow");
            if (this.config.toolbar[index].ajaxConfig) {
                const pconfig = JSON.parse(JSON.stringify(this.config.toolbar[index].ajaxConfig));
                if (this.tempParameters["_id"]) {
                    //修改保存
                    const ajaxData = await this.execAjax(pconfig["update"], null);
                    if (ajaxData) {
                        console.log("修改保存成功", ajaxData);
                        this.dataList = JSON.parse(JSON.stringify(this.dataList));
                    }
                }
                else {
                    //新增保存
                    const ajaxData = await this.execAjax(pconfig["add"], null);
                    if (ajaxData) {
                        console.log("新增保存成功", ajaxData);
                        this.dataList = JSON.parse(JSON.stringify(this.dataList));
                    }
                }
            }


        }
        console.log('需要保存的数据', newdataList);
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
            item.selected = false;
        });
        data.selected = true;// 行选中

        // 单选(check=select)，如果是未勾选，第一次点击选中，再次点击取消选中
        // 多选（check=select），如果是未勾选，第一次点击选中，再次点击取消选中
        // 多勾选单选中行（check》select）勾选和行选中各自独立，互不影响

        console.log("注册api事件", this._formEvent);
        console.log("行选中selectRowdata", data);
        this._formEvent['selectRow'].forEach(sendEvent => {
            if (sendEvent.isRegister === true) {

                console.log("关系描述", sendEvent);
                let parent = {};
                sendEvent.data.params.forEach(element => {
                    parent[element["cid"]] = data[element["pid"]];
                });

                console.log('主子关系字段', parent);
                const receiver = { name: 'refreshAsChild', receiver: sendEvent.receiver, parent: parent };
                console.log("选中行发消息事件", receiver);
                this.relativeMessage.sendMessage({ type: 'relation' }, receiver);
                console.log("选中行发消息事件over");
            }
        });
        this._formEvent['selectRowBySetValue'].forEach(sendEvent => {
            if (sendEvent.isRegister === true) {
                console.log("关系描述", sendEvent);
                let parent = {};
                sendEvent.data.params.forEach(element => {
                    parent[element["cid"]] = data[element["pid"]];
                });

                console.log('主子关系字段', parent);
                const receiver = { name: 'initComponentValue', receiver: sendEvent.receiver, parent: parent };
                console.log("选中行发消息事件", receiver);
                this.relativeMessage.sendMessage({ type: 'relation' }, receiver);
                console.log("选中行发消息事件over");
            }
        });
    }

    userNameChange(data?) {
        //console.log('子页面', data);
        const index = this.dataList.findIndex(item => item.key === data.key);
        this.editCache[data.key].data[data.name] = data.data;
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


    /** 刷新，作为子表的刷新*/
    refreshAsChild(parentId?) {
        console.log("刷新，作为子表的刷新", parentId);
        for (const d in parentId) {
            this.tempParameters[d] = parentId[d];
        }
        this.load("load");//调用子表的刷新
        console.log("子表刷新是取到主表的值", this.tempParameters);
    }

    //初始化参数列表，参数列表初始化后load（当前参数的取值）
    initParameters(data?) {
        for (const d in data) {
            this.tempParameters[d] = data[d];
        }
        console.log("初始化参数", this.tempParameters);
        this.load('load');//参数完成后加载刷新
    }

    //初始化组件值
    initComponentValue(data?) {
        for (const d in data) {
            if (d === 'dataList') {
                this.dataList = JSON.parse(data[d]) ? JSON.parse(data[d]) : [];
                this.total = this.dataList.length;
            }
            else {
                this.tempParameters[d] = data[d];
            }
        }
    }


    formSendMessage(data?) {
        if (data) {
            if (this._formEvent[data.name]) {
                this._formEvent[data.name].push({ isRegister: true, receiver: data.receiver, data: data.relationData });
            }
        }
    }

    // 接收消息
    formReceiveMessage(data?) {
        console.log('表单接收消息', data);
        if (data) {
            switch (data.name) {
                case 'refreshAsChild':
                    this.refreshAsChild(data.parent);
                    break;
                case 'initParameters':
                    this.initParameters(data.parent);
                    break;
                case 'initComponentValue':
                    this.initComponentValue(data.parent);
                    break;
            }
        }
    }

    // 解析关系
    analysisRelation(data?) {
        if (this.config.relation) {
            this.config.relation.forEach(relation => {
                if (relation.relationSendContent) {
                    relation.relationSendContent.forEach(relationSend => {
                        this.formSendMessage(relationSend);
                    });
                }
                if (relation.relationReceiveContent) {
                    const subMessage = this.relativeMessage.getMessage().subscribe(value => {
                        switch (value.type.type) {
                            case 'relation':
                                if (value.data.receiver === this.config.viewId) {
                                    this.formReceiveMessage(value.data);
                                }
                                break;
                            case 'initParameters':
                                console.log(value.data.receiver, this.config);
                                if (value.data.receiver === this.config.viewId) {
                                    this.formReceiveMessage(value.data);
                                }
                                break;
                        }
                    });
                    if (subMessage) {
                        this._subscribArr.push(subMessage);
                    }
                }

            });

        }


        console.log('解析关系信息', data);

    };

    // 销毁
    _subscribArr: any[] = [];
    ngOnDestroy() {
        if (this._subscribArr.length > 0) {
            this._subscribArr.forEach(sub => {
                sub.unsubscribe();
            });
        }
    }


}
