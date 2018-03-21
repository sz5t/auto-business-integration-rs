import { Component, HostListener } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'header-storage',
    template: `
    <i class="anticon anticon-tool"></i>
    清除本地缓存
    `
})
export class HeaderStorageComponent {

    constructor(
        private confirmServ: NzModalService,
        private messageServ: NzMessageService
    ) {
    }

    @HostListener('click')
    _click() {
        this.confirmServ.confirm({
            title: '确认要清除本地缓存?',
            onOk: () => {
                localStorage.clear();
                this.messageServ.success('清理完成!');
            }
        });
    }
}
