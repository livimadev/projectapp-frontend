import { Component, inject, ViewChild } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course} from '../../model/course';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-course',
  imports: [
    MatTableModule,
    MatIconModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  //displayedColumns: string[] = ['idCourse', 'code', 'name'];
  dataSource: MatTableDataSource<Course>;
  // publishers: Publisher[];
  columnsDefinitions = [
    { def: 'idCourse', label: 'idCourse', hide: true },
    { def: 'code', label: 'code', hide: false },
    { def: 'name', label: 'name', hide: false },
    { def: 'actions', label: 'actions', hide: false },
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //constructor(private publisherService: PublisherService){}
  courseService = inject(CourseService);

  ngOnInit(): void {
    // this.courseService.findAll().subscribe(data => console.log(data));
    // this.courseService.findAll().subscribe(data => this.courses = data);
    this.courseService.findAll().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getDisplayedColumns() {
    return this.columnsDefinitions.filter((cd) => !cd.hide).map((cd) => cd.def);
  }

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }
}
