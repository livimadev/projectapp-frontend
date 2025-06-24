import { Routes } from "@angular/router";
import { CourseComponent } from "./course/course.component";
import { CourseEditComponent } from "./course/course-edit/course-edit.component";
import { TeacherComponent } from "./teacher/teacher.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

export const pagesRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent},
    {
        path: 'course',
        component: CourseComponent, children: [
            { path: 'new', component: CourseEditComponent },
            { path: 'edit/:id', component: CourseEditComponent },
        ],
    },
    { path: 'teacher', component: TeacherComponent },
]