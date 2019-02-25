import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {SERVER_API_URL} from "../app.constants";
import {Item} from "../models/item";

@Injectable()
export class ItemService {

  constructor(private http: HttpClient) {
  }

  save(item: Item): Observable<HttpResponse<Item>> {
    return this.http.post<Item>(SERVER_API_URL + '/item', item, {observe: 'response'});
  }

  getAllByCustomer(id: number): Observable<HttpResponse<Item[]>> {
    return this.http.get<Item[]>(SERVER_API_URL + `/item/customer/${id}`, {observe: 'response'});
  }

}
