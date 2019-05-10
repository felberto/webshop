import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {SERVER_API_URL} from "../app.constants";
import {Item} from "../models/item";
import {CreateItemDto} from "../models/dto/create-item.dto";
import {EditItemDto} from "../models/dto/edit-item.dto";
import {Customer} from "../models/customer";

@Injectable()
export class ItemService {

  constructor(private http: HttpClient) {
  }

  save(createItemDto: CreateItemDto): Observable<HttpResponse<Item>> {
    return this.http.post<Item>(SERVER_API_URL + '/item', createItemDto, {observe: 'response'});
  }

  update(editItemDto: EditItemDto, id: number): Observable<HttpResponse<Item>> {
    return this.http.put<Item>(SERVER_API_URL + `/item/${id}`, editItemDto, {observe: 'response'});
  }

  get(id: number): Promise<EditItemDto>{
    return this.http.get<EditItemDto>(SERVER_API_URL + `/item/${id}`, {observe: 'response'}).toPromise()
      .then(res => res.body)
      .catch(err => {
        return Promise.reject(err.json().error  || 'Server error');
      });
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

  addToCart(itemId: number, customerId: number): Observable<{}> {
    return this.http.put(SERVER_API_URL + `/item/add`, {itemId, customerId}, {observe: 'response'});
  }
}
