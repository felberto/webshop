import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {SERVER_API_URL} from "../app.constants";
import {Customer} from "../models/customer";
import {CustomerProfileDto} from "../models/dto/customerProfileDto";

@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  save(customer: Customer): Observable<HttpResponse<Customer>> {
    return this.http.post<Customer>(SERVER_API_URL + '/customer', customer, {observe: 'response'});
  }

  update(id: number, profileDto: CustomerProfileDto): Observable<HttpResponse<Customer>> {
    return this.http.put<Customer>(SERVER_API_URL + `/customer/${id}`, profileDto, {observe: 'response'});
  }

  getProfile(id: number): Observable<HttpResponse<Customer>>{
    return this.http.get<Customer>(SERVER_API_URL + `/customer/${id}`, {observe: 'response'});
  }
}
