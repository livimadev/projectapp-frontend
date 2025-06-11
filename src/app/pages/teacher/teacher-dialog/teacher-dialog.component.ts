import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Teacher } from '../../../model/teacher';
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TeacherService } from '../../../services/teacher.service';
import { MatCardModule } from '@angular/material/card';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-teacher-dialog',
  imports: [
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './teacher-dialog.component.html',
  styleUrl: './teacher-dialog.component.css'
})
export class TeacherDialogComponent {
  teacher: Teacher;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Teacher,
    private _dialogRef: MatDialogRef<TeacherDialogComponent>,
    private teacherService: TeacherService
  ){}

  gOnInit(): void {
    this.teacher = {... this.data}; //spread operator
    //this.teacher = this.data;
    /*this.teacher = new Teacher();
    this.teacher.idTeacher = this.data.idTeacher;
    this.teacher.fatherLastname = this.data.fatherLastname;
    this.teacher.motherLastname = this.data.motherLastname;
    this.teacher.photo = this.data.photo;*/
  }

  close(){
    this._dialogRef.close();
  }

  operate(){
    if(this.teacher != null && this.teacher.idTeacher > 0){
      //UPDATE
      this.teacherService.update(this.teacher.idTeacher, this.teacher)
        .pipe(switchMap ( () => this.teacherService.findAll()))
        .subscribe(data => {
          this.teacherService.setTeacherChange(data);
          this.teacherService.setMessageChange('UPDATED!');
        });
    }else{
      //INSERT
      this.teacherService.save(this.teacher)
        .pipe(switchMap ( () => this.teacherService.findAll()))
        .subscribe(data => {
          this.teacherService.setTeacherChange(data);
          this.teacherService.setMessageChange('CREATED!');
        });
    }

    this.close();
  }
}
