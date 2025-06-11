import { Component, ViewChild } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { Teacher } from '../../model/teacher';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { TeacherDialogComponent } from './teacher-dialog/teacher-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-teacher',
  imports: [
    MatTableModule,
    MatFormFieldModule, 
    MatIconModule, 
    MatInputModule,
    MatSortModule,
    MatSnackBarModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent {
  dataSource: MatTableDataSource<Teacher>;

  columnsDefinitions = [
    { def: 'idTeacher', label: 'idTeacher', hide: true },
    { def: 'code', label: 'code', hide: false },
    { def: 'fatherLastname', label: 'fatherLastname', hide: false },
    { def: 'motherLastname', label: 'motherLastname', hide: false },
    { def: 'firstName', label: 'firstName', hide: false },
    { def: 'secondName', label: 'secondName', hide: false },
    { def: 'actions', label: 'actions', hide: false },
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private teacherService: TeacherService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.teacherService.findAll().subscribe((data) => {
      this.createTable(data);
    });

    this.teacherService.getTeacherChange().subscribe(data => this.createTable(data));

    this.teacherService.getMessageChange().subscribe(data => this._snackBar.open(data, 'INFO', {duration: 2000}));
  }

  createTable(data: Teacher[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getDisplayedColumns() {
    return this.columnsDefinitions.filter((cd) => !cd.hide).map((cd) => cd.def);
  }

  openDialog(teacher?: Teacher){
    this._dialog.open(TeacherDialogComponent, {
      width: '750px',
      data: teacher
    });
  }

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }

  delete(id: number){
      this.teacherService.delete(id)
        .pipe(switchMap( () => this.teacherService.findAll()))
        .subscribe( data => {
          this.teacherService.setTeacherChange(data);
          this.teacherService.setMessageChange('DELETED!');
        });
    }
}
