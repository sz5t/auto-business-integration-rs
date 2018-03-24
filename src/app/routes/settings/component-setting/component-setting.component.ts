import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
    selector: 'app-component-setting',
    templateUrl: './component-setting.component.html',
})
export class ComponentSettingComponent implements OnInit {
    _funcOptions = [
        {
            value: 'm_1',
            label: '模块 1',
            children: [
                {
                    value: 'f_1',
                    label: '功能 1',
                    isLeaf: true
                },
                {
                    value: 'f_2',
                    label: '功能 2',
                    isLeaf: true
                }
            ],
        },
        {
            value: 'm_2',
            label: '模块 2',
            children: [
                {
                    value: 'f2_1',
                    label: '功能 1',
                    isLeaf: true
                }
            ]
        }
    ];
    _funcValue;
    _editorConfig = {
        title: '标题 1',
        rows: [
            {
                row: {
                    cols: [
                        {
                            title: '区域1',
                            span: 24,
                            size: {
                                nzXs: 24,
                                nzSm: 24,
                                nzMd: 24,
                                nzLg: 24,
                                ngXl: 24
                            },
                            tabs: [
                                {
                                    title: '数据源设置',
                                    icon: '',
                                    active: false,
                                    viewCfg: [
                                        {
                                            'viewId': 'code_edit',
                                            'component': 'code_edit',
                                            'config': {

                                            }
                                        },
                                        {
                                            tabs: [
                                                {
                                                    title: '字段列表',
                                                    icon: '',
                                                    active: false,
                                                    viewCfg: [{
                                                        'viewId': 'operation_sqlColumns1',
                                                        'component': 'bsnDataTable',
                                                        'config': {
                                                            'keyId': 'key',
                                                            'nzIsPagination': false, // 是否分页
                                                            'nzShowTotal': true,// 是否显示总数据量
                                                            'pageSize': 5, //默认每页数据条数
                                                            'nzPageSizeSelectorValues': [5, 10, 20, 30, 40, 50],
                                                            'nzLoading': false, // 是否显示加载中
                                                            'nzBordered': false,// 是否显示边框
                                                            'columns': [  
                                                                {
                                                                    title: '主键', field: 'key', width: 80, hidden: true, editor: {
                                                                        type: 'input',
                                                                        field: 'key',
                                                                        options: {
                                                                            'type': 'input',
                                                                            'labelSize': '6',
                                                                            'controlSize': '10',
                                                                            'inputType': 'text',
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    title: '字段名称', field: 'fieldName', width: 80,
                                                                    editor: {
                                                                        type: 'input',
                                                                        field: 'fieldName',
                                                                        options: {
                                                                            'type': 'input',
                                                                            'labelSize': '6',
                                                                            'controlSize': '10',
                                                                            'inputType': 'text',
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    title: '标题', field: 'title', width: 80,
                                                                    editor: {
                                                                        type: 'input',
                                                                        field: 'title',
                                                                        options: {
                                                                            'type': 'input',
                                                                            'labelSize': '6',
                                                                            'controlSize': '10',
                                                                            'inputType': 'text',
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    title: '数据类型', field: 'dataTypeName', width: 80, hidden: false,
                                                                    editor: {
                                                                        type: 'select',
                                                                        field: 'dataType',
                                                                        options: {
                                                                            'type': 'select',
                                                                            'labelSize': '6',
                                                                            'controlSize': '10',
                                                                            'inputType': 'submit',
                                                                            'name': 'sex',
                                                                            'label': '性别',
                                                                            'notFoundContent': '',
                                                                            'selectModel': false,
                                                                            'showSearch': true,
                                                                            'placeholder': '-请选择-',
                                                                            'disabled': false,
                                                                            'size': 'default',
                                                                            'clear': true,
                                                                            'width': '60px',
                                                                            'options': [
                                                                                {
                                                                                    'label': '男',
                                                                                    'value': '1',
                                                                                    'disabled': false
                                                                                },
                                                                                {
                                                                                    'label': '女',
                                                                                    'value': '2',
                                                                                    'disabled': false
                                                                                }
                                                                            ]
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    title: '展示样式', field: 'displayStyleName', width: 80, hidden: false,
                                                                    editor: {
                                                                        type: 'select',
                                                                        field: 'displayStyle',
                                                                        options: {
                                                                            'type': 'select',
                                                                            'labelSize': '6',
                                                                            'controlSize': '10',
                                                                            'inputType': 'submit',
                                                                            'name': 'sex',
                                                                            'label': '性别',
                                                                            'notFoundContent': '',
                                                                            'selectModel': false,
                                                                            'showSearch': true,
                                                                            'placeholder': '-请选择-',
                                                                            'disabled': false,
                                                                            'size': 'default',
                                                                            'clear': true,
                                                                            'width': '60px',
                                                                            'options': [
                                                                                {
                                                                                    'label': '男',
                                                                                    'value': '1',
                                                                                    'disabled': false
                                                                                },
                                                                                {
                                                                                    'label': '女',
                                                                                    'value': '2',
                                                                                    'disabled': false
                                                                                }
                                                                            ]
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    title: '是否显示', field: 'isShowName', width: 80, hidden: false,
                                                                    editor: {
                                                                        type: 'select',
                                                                        field: 'isShow',
                                                                        options: {
                                                                            'type': 'select',
                                                                            'labelSize': '6',
                                                                            'controlSize': '10',
                                                                            'inputType': 'submit',
                                                                            'name': 'sex',
                                                                            'label': '性别',
                                                                            'notFoundContent': '',
                                                                            'selectModel': false,
                                                                            'showSearch': true,
                                                                            'placeholder': '-请选择-',
                                                                            'disabled': false,
                                                                            'size': 'default',
                                                                            'clear': true,
                                                                            'width': '60px',
                                                                            'options': [
                                                                                {
                                                                                    'label': '男',
                                                                                    'value': '1',
                                                                                    'disabled': false
                                                                                },
                                                                                {
                                                                                    'label': '女',
                                                                                    'value': '2',
                                                                                    'disabled': false
                                                                                }
                                                                            ]
                                                                        }
                                                                    }
                                                                },
                                                                
                                                                {
                                                                    title: '排序', field: 'order', width: 80, hidden: false,
                                                                    editor: {
                                                                        type: 'input',
                                                                        field: 'order',
                                                                        options: {
                                                                            'type': 'input',
                                                                            'labelSize': '6',
                                                                            'controlSize': '10',
                                                                            'inputType': 'text',
                                                                        }
                                                                    }
                                                                }
                                                               
                                                            ],
                                                            'toolbar': [
                                                                { 'name': 'refresh', 'class': 'editable-add-btn', 'text': '刷新' },
                                                                { 'name': 'addRow', 'class': 'editable-add-btn', 'text': '新增' },
                                                                { 'name': 'updateRow', 'class': 'editable-add-btn', 'text': '修改' },
                                                                { 'name': 'deleteRow', 'class': 'editable-add-btn', 'text': '删除' },
                                                                { 'name': 'saveRow', 'class': 'editable-add-btn', 'text': '保存' },
                                                                { 'name': 'cancelRow', 'class': 'editable-add-btn', 'text': '取消' }
                                                            ]
                                                        },
                                                        'dataList': []
                                                    }]
                                                },
                                                {
                                                    title: '参数列表',
                                                    icon: '',
                                                    active: false,
                                                    viewCfg: [{
                                                        'viewId': 'operation_sqlColumns1',
                                                        'component': 'bsnDataTable',
                                                        'config': {
                                                            'keyId': 'key',
                                                            'nzIsPagination': false, // 是否分页
                                                            'nzShowTotal': true,// 是否显示总数据量
                                                            'pageSize': 5, //默认每页数据条数
                                                            'nzPageSizeSelectorValues': [5, 10, 20, 30, 40, 50],
                                                            'nzLoading': false, // 是否显示加载中
                                                            'nzBordered': false,// 是否显示边框
                                                            'columns': [
                                                                {
                                                                    title: '主键', field: 'key', width: 80, hidden: true, editor: {
                                                                        type: 'input',
                                                                        field: 'key',
                                                                        options: {
                                                                            'type': 'input',
                                                                            'labelSize': '6',
                                                                            'controlSize': '10',
                                                                            'inputType': 'text',
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    title: '姓名', field: 'name', width: 80,
                                                                    editor: {
                                                                        type: 'input',
                                                                        field: 'name',
                                                                        options: {
                                                                            'type': 'input',
                                                                            'labelSize': '6',
                                                                            'controlSize': '10',
                                                                            'inputType': 'text',
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    title: '性别', field: 'sexname', width: 80, hidden: false,
                                                                    editor: {
                                                                        type: 'select',
                                                                        field: 'sex',
                                                                        options: {
                                                                            'type': 'select',
                                                                            'labelSize': '6',
                                                                            'controlSize': '10',
                                                                            'inputType': 'submit',
                                                                            'name': 'sex',
                                                                            'label': '性别',
                                                                            'notFoundContent': '',
                                                                            'selectModel': false,
                                                                            'showSearch': true,
                                                                            'placeholder': '-请选择-',
                                                                            'disabled': false,
                                                                            'size': 'default',
                                                                            'clear': true,
                                                                            'width': '60px',
                                                                            'options': [
                                                                                {
                                                                                    'label': '男',
                                                                                    'value': '1',
                                                                                    'disabled': false
                                                                                },
                                                                                {
                                                                                    'label': '女',
                                                                                    'value': '2',
                                                                                    'disabled': false
                                                                                }
                                                                            ]
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    title: '年龄', field: 'age', width: 80, hidden: false,
                                                                    editor: {
                                                                        type: 'input',
                                                                        field: 'age',
                                                                        options: {
                                                                            'type': 'input',
                                                                            'labelSize': '6',
                                                                            'controlSize': '10',
                                                                            'inputType': 'text',
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    title: '地址', field: 'address', width: 80, hidden: false,
                                                                }
                                                            ]
                                                        },
                                                        'dataList': []
                                                    }]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
        ]
    };
    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }

    nodes = [

        {
            id: '1',
            name: 'root3',
            data: 'ahhahah'
        },
        {
            id: '2',
            name: 'async root4',
            hasChildren: true,
            children: [
                {
                    name: '子节点1'
                },
                {
                    name: '子节点2'
                }
            ]
        },
        {
            id: '3',
            name: 'root1'
        },
        {
            id: '4',
            name: 'root2'
        }
    ];

    treeconfig = {
        nzAutoExpandParent: true, //是否自动展开父节点，当数字时展开最大节点 false
        nzAllowChildLinkage: true,// 是否开启父节点的checkbox状态的会影响子节点状态 true
        nzAllowParentLinkage: true,// 是否开启子节点的checkbox状态的会影响父节点状态 true
        nzCheckable: false, //  在节点之前添加一个复选框 false
        nzShowLine: false, // 显示连接线 false
    };

    /**
    点击树节点 */
    onActivate(ev: any) {
        console.log('激活树节点', ev);
    }

    _changeValue($event) {
        console.log('功能模块选择', $event);
    }
}
