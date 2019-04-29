import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {SERVER_API_URL} from "../app.constants";
import {Item} from "../models/item";
import {CreateItemDto} from "../models/dto/create-item.dto";

@Injectable()
export class ItemService {

  constructor(private http: HttpClient) {
  }

  save(createItemDto: CreateItemDto): Observable<HttpResponse<Item>> {
    return this.http.post<Item>(SERVER_API_URL + '/item', createItemDto, {observe: 'response'});
  }

  getAllByCustomer(id: number): Observable<HttpResponse<Item[]>> {
    return this.http.get<Item[]>(SERVER_API_URL + `/item/customer/${id}`, {observe: 'response'});
  }

  getAllAvailable(): Observable<HttpResponse<Item[]>> {
    return this.http.get<Item[]>(SERVER_API_URL + '/item/available', {observe: 'response'});
  }

  getAllCartItems(id: number): Observable<HttpResponse<Item[]>> {
    return this.http.get<Item[]>(SERVER_API_URL + `/item/cart/customer/${id}`, {observe: 'response'});
  }

  removeFromCart(item: CreateItemDto): Observable<HttpResponse<Item>> {
    return this.http.put<Item>(SERVER_API_URL + `/item/removed`, item, {observe: 'response'});
  }
}
