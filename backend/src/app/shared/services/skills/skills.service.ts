import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { InterfaceService } from '../auth/interface.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SkillsService extends InterfaceService {

    constructor(private http: HttpClient,
        private router: Router,) {
        super();
    }

    /**
     *
     * @param postData
     * @returns {Observable<any>}
     */
    addSkill(postData) {
        return this.http.post(this.getApiUrl(`skills/`), postData, this.getHttpOptions('json', true)).pipe(
            map(Response => Response),
            catchError(this.handleError)
        );
    }

    /**
     *
     * @param postData
     * @returns {Observable<any>}
     */
    editSkill(postData) {
        return this.http.post(this.getApiUrl(`skills/edit-skill/`), postData, this.getHttpOptions('json', true)).pipe(
            map(Response => Response),
            catchError(this.handleError)
        );
    }


    /**
     *
     * @returns {Observable<any>}
     */
    listSkills() {
        return this.http.get(this.getApiUrl(`skills/`), this.getHttpOptions('json', true)).pipe(
            map(Response => Response),
            catchError(this.handleError)
        );
    }

    /**
     *
     * @returns {Observable<any>}
     */
    getSkill(id) {
        return this.http.get(this.getApiUrl(`skills/${id}/get-skill`), this.getHttpOptions('json', true)).pipe(
            map(Response => Response),
            catchError(this.handleError)
        );
    }

    // Delete skill action
    deleteSkill(id) {
        return this.http.get(this.getApiUrl(`skills/${id}/delete-skill`), this.getHttpOptions('json', true)).pipe(
            map(Response => Response),
            catchError(this.handleError)
        );
    }

    /**
       *
       * @param postData
       * @returns {Observable<any>}
       */
    addEmployeeSkill(postData) {
        return this.http.post(this.getApiUrl(`skills/add-employee-skill/`), postData, this.getHttpOptions('json', true)).pipe(
            map(Response => Response),
            catchError(this.handleError)
        );
    }

    /**
     *
     * @param postData
     * @returns {Observable<any>}
     */
    editEmployeeSkill(postData) {
        return this.http.post(this.getApiUrl(`skills/edit-employee-skill/`), postData, this.getHttpOptions('json', true)).pipe(
            map(Response => Response),
            catchError(this.handleError)
        );
    }


    /**
     *
     * @returns {Observable<any>}
     */
    listEmployeeSkills() {
        return this.http.get(this.getApiUrl(`skills/list-employee-skills`), this.getHttpOptions('json', true)).pipe(
            map(Response => Response),
            catchError(this.handleError)
        );
    }

    /**
     *
     * @returns {Observable<any>}
     */
    getEmployeeSkill(id) {
        return this.http.get(this.getApiUrl(`skills/${id}/get-employee-skill`), this.getHttpOptions('json', true)).pipe(
            map(Response => Response),
            catchError(this.handleError)
        );
    }

    // Delete skill action
    deleteEmployeeSkill(id) {
        return this.http.get(this.getApiUrl(`skills/${id}/delete-employee-skill`), this.getHttpOptions('json', true)).pipe(
            map(Response => Response),
            catchError(this.handleError)
        );
    }


}

