import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommonService {
  private subjectItem = new Subject<any>();

  deleteItem(item) {
    this.subjectItem.next(item);
 }

 getUpdateItem(): Observable<any> {
  return this.subjectItem.asObservable();
}

}
