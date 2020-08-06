import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseDto } from 'app/shared/model/course-dto.model';
import { SERVER_API_URL } from 'app/app.constants';
import { CourseWithTNDto } from 'app/shared/model/courseWithTN-dto.model';
import { url } from 'inspector';
import Any = jasmine.Any;

@Injectable()
export class CourseService {
    private courseAddressUrl = SERVER_API_URL + '/api/course/findAllCoursesDto';
    private courseAddressWithTNUrl = SERVER_API_URL + '/api/course/findAllCoursesWithTNDto';
    private courseDeleteUrl = SERVER_API_URL + '/api/course/deleteCourse';
    private courseUpdateUrl = SERVER_API_URL + '/api/course/updateCourse';
    private addCourseToStudentUrl = SERVER_API_URL + '/api/course/addCourseToStudent';
    private addCourseUrl = SERVER_API_URL + '/api/course/addCourse';

    constructor(private http: HttpClient) {}

    getCourseInfo(): Observable<CourseDto[]> {
        return this.http.get<CourseDto[]>(`${this.courseAddressUrl}`);
    }

    getCourseInfoWithTN(): Observable<CourseWithTNDto[]> {
        return this.http.get<CourseWithTNDto[]>(`${this.courseAddressWithTNUrl}`);
    }

    delete(courseName: String): Observable<Response> {
        return this.http.delete<Response>(`${this.courseDeleteUrl}/${courseName}`);
    }

    update(course: CourseDto): Observable<Response> {
        return this.http.put<Response>(this.courseUpdateUrl, course);
    }

    addCourseToStudent(courseName: String, currentUserCredential: String) {
        return this.http.post(SERVER_API_URL + '/api/course/addCourseToStudent', { courseName, currentUserCredential });
    }

    createCourse(course: CourseDto): Observable<Object> {
        debugger;
        return this.http.post(`${this.addCourseUrl}`, course);
    }
}
