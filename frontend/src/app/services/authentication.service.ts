import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Customer} from "../models/customer";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {SERVER_API_URL} from "../app.constants";
import {map} from "rxjs/operators";

@Injectable()
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Customer>;
  public currentUser: Observable<Customer>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Customer>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Customer {
    return this.currentUserSubject.value;
  }

  login(customer: Customer): Observable<HttpResponse<Customer>> {
    return this.http.post<any>(SERVER_API_URL + '/customer/authenticate', customer)
      .pipe(map(customer => {
        if (customer) {
          localStorage.setItem('currentUser', JSON.stringify(customer));
          this.currentUserSubject.next(customer);
        }

        return customer;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
