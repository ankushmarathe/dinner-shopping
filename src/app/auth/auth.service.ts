import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from '../../environments/environment.custom';

interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({ providedIn:'root' })
export class AuthService {
    constructor(private http: HttpClient) {}

    public signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            environment.MSAL.API_URL_SIGNUP,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .pipe(catchError(error => {
            let errorMessage: string = 'An unknown error occured';

            if (!error.error || !error.error.error) {
                return throwError(errorMessage);
            }
            switch (error.error.error.message) {
                case 'EMAIL_EXISTS':
                  errorMessage = 'A user with this email already exists.'
              }
            return throwError(errorMessage);
        }));
    }
}