import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { InterfaceService } from '../auth/interface.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap, first, map } from 'rxjs/operators';
import { getToken, GetApiurl } from '../../app-config';
@Injectable({
  providedIn: 'root'
})
export class UserService extends InterfaceService {
  public updatedProfilePic = new BehaviorSubject<string>('');
  public profPicasObservable = this.updatedProfilePic.asObservable();
  constructor(private http: HttpClient,
    private router: Router,) {
    super();
  }

  createNewUser(data) {
    return this.http.post(this.getApiUrl(`users/`), data, this.getHttpOptions('json', true)).pipe(
      map(Response => Response),
      catchError(this.handleError)
    );
  }

  // User list action
  getUserList() {
    return this.http.get(this.getApiUrl('users/users-list'), this.getHttpOptions()).pipe(
      map(response => response),
      catchError(error => {
        this.handleError(error);
        return error;
      })
    );
  }

  // Delete user action
  deleteUser(userId) {
    return this.http.delete(this.getApiUrl(`users/${userId}/delete-user`), this.getHttpOptions('json', true)).pipe(
      map(Response => Response),
      catchError(this.handleError)
    );
  }

  // check whether email exists or not
  checkEmailExists(data) {
    return this.http.post(this.getApiUrl(`users/email-already-exists/`), data, this.getHttpOptions('json', true)).pipe(
      map(Response => Response),
      catchError(this.handleError)
    );
  }

  // get current user data
  getUserData() {
    return this.http.get(this.getApiUrl('users/get-user'), this.getHttpOptions()).pipe(
      map(response => response),
      catchError(error => {
        this.handleError(error);
        return error;
      })
    );
  }

  // Employee list action
  getEmployeeList() {
    return this.http.get(this.getApiUrl('skills/get-employee-list'), this.getHttpOptions()).pipe(
      map(response => response),
      catchError(error => {
        this.handleError(error);
        return error;
      })
    );
  }

  // Delete user action
  getDashboardData(id) {
    return this.http.get(this.getApiUrl(`skills/${id}/get-dashboard-data`), this.getHttpOptions('json', true)).pipe(
      map(Response => Response),
      catchError(this.handleError)
    );
  }

}
