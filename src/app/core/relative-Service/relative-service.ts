import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RelativeService {

  private subject = new Subject<any>();

  sendMessage(messageType: any, messageData: any) {
    this.subject.next({type: messageType, data: messageData});
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

}
