import { inject, Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Teacher } from '../model/teacher';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService extends GenericService<Teacher> {

  private teacherChange: Subject<Teacher[]> = new Subject<Teacher[]>();
  private messageChange: Subject<string> = new Subject<string>();

  constructor(){
    super(
      inject(HttpClient),
      `${environment.HOST}/teachers`
    );
  }

  setTeacherChange(teacher: Teacher[]){
    this.teacherChange.next(teacher);
  }

  getTeacherChange(){
    return this.teacherChange.asObservable();
  }

  setMessageChange(data: string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }
}
