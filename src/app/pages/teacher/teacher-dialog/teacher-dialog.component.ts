import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { switchMap } from 'rxjs';
import { Teacher } from '../../../model/teacher';
import { TeacherService } from '../../../services/teacher.service';

@Component({
  selector: 'app-teacher-dialog',
  imports: [
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
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

  ngOnInit(): void {
    this.teacher = {... this.data}; //spread operator
    // this.teacher = this.data;
    /*this.teacher = new Teacher();
    this.teacher.idTeacher = this.data.idTeacher;
    this.teacher.code = this.data.code;
    this.teacher.fatherLastname = this.data.fatherLastname;
    this.teacher.motherLastname = this.data.motherLastname;
    this.teacher.firstName = this.data.firstName;
    this.teacher.secondName = this.data.secondName;*/
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
