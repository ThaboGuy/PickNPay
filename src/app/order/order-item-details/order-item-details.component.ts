import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../users/shared/customer.service';
import { CartService } from '../../cart/shared/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CartInfoService } from '../../cart/shared/cart-info.service';
import { ProductService } from '../../product/shared/product.service';
import { CheckoutService } from '../../checkout/shared/checkout.service';
import { OrderService } from '../shared/order.service';
import { OrderItemService } from '../shared/order-item.service';
import { Order } from '../shared/order.model';
import { AddressService } from '../../address/shared/address.service';

@Component({
  selector: 'app-order-item-details',
  templateUrl: './order-item-details.component.html',
  styleUrls: ['./order-item-details.component.css'],
  providers:[CustomerService,CartService,OrderService,AddressService,CheckoutService,CartInfoService,ProductService,OrderItemService]

})
export class OrderItemDetailsComponent implements OnInit {
  order: Order;
  selectedOrder: any;

  constructor(private router: Router,private customerService: CustomerService,private cartService : CartService,private toastr : ToastrService,private cartInfoService : CartInfoService,private productService : ProductService,private paymentService:CheckoutService,private orderService: OrderService,private orderItemService: OrderItemService) { }

  ngOnInit() {
    this.orderItemService.GetOrderItem().subscribe((data: any) =>{
      this.order = Object.assign({},data.json());
      this.selectedOrder = this.order;
    });
  }

}
