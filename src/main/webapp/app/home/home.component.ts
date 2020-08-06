import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, Principal, Account } from 'app/core';
import { CourseService } from 'app/shared/service/CourseService';
import { CourseDto } from 'app/shared/model/course-dto.model';
import { CourseWithTNDto } from 'app/shared/model/courseWithTN-dto.model';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    classNameNeedToReg: string;

    addedCourse: CourseDto;
    Name: string;
    Location: string;
    Content: string;
    Teacher: number;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private courseService: CourseService
    ) {}

    courses: CourseDto[] = [];

    coursesWithTN: CourseWithTNDto[] = [];

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    getAllCourses() {
        debugger;
        this.courseService.getCourseInfo().subscribe(curDto => {
            if (!curDto) {
                this.courses = [];
            } else {
                this.courses = curDto;
            }
        });
    }

    getAllCoursesWithTN() {
        this.courseService.getCourseInfoWithTN().subscribe(curDto => {
            if (!curDto) {
                this.coursesWithTN = [];
            } else {
                this.coursesWithTN = curDto;
            }
        });
    }

    // registerCourse(courseName) {
    //
    // }

    deleteCourse(courseName: String) {
        debugger;
        this.courseService.delete(courseName).subscribe(curDto => {
            if (!curDto) {
                this.courses = [];
            }
        });
        this.courseService.getCourseInfo().subscribe(curDto => {
            if (!curDto) {
                this.courses = [];
            } else {
                this.courses = curDto;
            }
        });
    }

    clearAllCourses() {
        this.courses = [];
    }

    // addCourseToStudent() {
    //     const courseName = 'temp';
    //     this.courseService.addCourseToStudent(courseName, currentUserCredential);
    // }

    addCourse() {
        debugger;

        this.addedCourse = {
            courseName: this.Name,
            courseContent: this.Content,
            courseLocation: this.Location,
            teacherId: this.Teacher
        };
        this.courseService.createCourse(this.addedCourse).subscribe(curDto => {
            if (!curDto) {
                this.courses = [];
            }
        });
    }
}
