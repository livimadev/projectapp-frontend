import { Routes } from '@angular/router';
import { CourseComponent } from './pages/course/course.component';
import { TeacherComponent } from './pages/teacher/teacher.component';

export const routes: Routes = [
    {
        path: 'pages/course',
        component: CourseComponent,
    },
    { path: 'pages/teacher', component: TeacherComponent },
];
