import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { OrderItem } from './order-item.model';


@Injectable()
export class OrderItemService {
  readonly rootUrl = 'http://localhost:61973/';

  constructor(private http : Http, private httpClient : HttpClient) { }


  PostOrderItem(ord : OrderItem){
    var body = JSON.stringify(ord);
    var headerOptions = new Headers({'Content-Type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers:headerOptions});
    return this.http.post(this.rootUrl +'api/OrderItem',body,requestOptions).map(x => x.json());
  }
  DeleteOrderItem(id: number){
    return this.http.delete(this.rootUrl +'api/Cart/'+id).map(res=>res.json());
  }
  GetOrderItem(){
    return this.http.get(this.rootUrl+'api/OrderItem?id='+localStorage.getItem("OrderID"));
  }


  
}
