import * as JWT from 'jwt-decode';

// Auth token identifier
export const AUTH_TOKEN = 'token';

// Stores token into the memory
export function setToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN, token);
}

// Gets token from the stored memory
export function getToken(): string|false {
    return localStorage.getItem(AUTH_TOKEN) ? localStorage.getItem(AUTH_TOKEN) : false;
}

// Removes token from the stored memory
export function unsetToken(): void {
    localStorage.removeItem(AUTH_TOKEN);
}

// Parses JWT token and returns the token expiration date
export function getTokenExpiration(): Date|false {
    const decoded: { id: number; exp: number } = JWT(<string>getToken());
    return new Date(decoded.exp * 1000);
}

// Checks whether the token is expired or not
export function isTokenExpired() {
    if (!getToken()) {
        return true;
    }
    return (<Date>getTokenExpiration()).getTime() <= (new Date()).getTime();
}
