import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course} from '../model/course';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private url: string=`${environment.HOST}/courses`;

  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Course[]>(this.url);
  }
}
