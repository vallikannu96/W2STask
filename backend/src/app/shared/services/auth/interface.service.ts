import { throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { getToken, GetApiurl } from '../../app-config';
import {Injectable, OnDestroy} from '@angular/core';

@Injectable()
export class InterfaceService implements OnDestroy {

    subscriptions: Object = {};

    // Creates http options for the data type
    public getHttpOptions(type: 'json' = 'json', auth: boolean = true): { headers: HttpHeaders } {
        let headers = new HttpHeaders({});

        if (auth && getToken()) {
            headers = headers.append('Authorization', `JWT ${getToken()}`);
        }

        switch (type) {
            case 'json': {
                headers = headers.append('Content-Type', 'application/json');
                break;
            }
        }

        return {
            headers: headers
        };
    }

    // Handeling error
    protected handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body['error'] || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else if (error instanceof HttpErrorResponse) {
            errMsg = error.error ? error.error : error.toString();
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return throwError(errMsg);
    }

    // Get API url
    protected getApiUrl(path: string, params?: Object) {
        return GetApiurl(path, params);
    }

    ngOnDestroy() {

        // Unsubscribe on service scope destroy
        Object.entries(this.subscriptions).forEach(
            ([name, subscription]) => subscription.unsubscribe()
        );
    }

}
