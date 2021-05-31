// Configurations
import { environment } from '../../../environments/environment';
export const baseUrl = environment.baseUrl;

// Get ApiURL
export function GetApiurl(path: string, params?: Object) {

    let url = baseUrl + path;
    if (params instanceof Object) {
        url += '?';

        Object.entries(params).forEach(([param, value]) => {
            url += `${encodeURIComponent(param)}=${encodeURIComponent(value)}&`;
        });
    }

    return url;
}

// Image types
export const validImageTypes = ['image/png', 'image/jpg', 'image/gif', 'image/jpeg'];
export const fileSize = 1048576;  // Equilent to 2 MB
