import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart/shared/cart.model';
import { CartInfo } from '../cart/shared/cart-info.model';
import { Router } from '@angular/router';
import { CustomerService } from '../users/shared/customer.service';
import { CartService } from '../cart/shared/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CartInfoService } from '../cart/shared/cart-info.service';
import { ProductService } from '../product/shared/product.service';
import { CheckoutService } from '../checkout/shared/checkout.service';
import { OrderService } from './shared/order.service';
import { Order } from './shared/order.model';
import { AddressService } from '../address/shared/address.service';
import { NgForm } from '@angular/forms';
import { OrderItem } from './shared/order-item.model';
import { OrderItemService } from './shared/order-item.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers:[CustomerService,CartService,OrderService,AddressService,CheckoutService,CartInfoService,ProductService,OrderItemService]

})
export class OrderComponent implements OnInit {
  totP : number = 0;
  totQ : number = 0;
  totalQuantity: number;
  totalP : number;
  cartDetails: Array<Cart> = [];
  arr1Length: number;
  arr2Length: number;
  cartInfo: Array<CartInfo> = [];
  userClaims: any;
  orderDate: any;
  tDate: any;
  order: Order;
  orderItem: OrderItem;

  




  constructor(private router: Router,private customerService: CustomerService,private cartService : CartService,private toastr : ToastrService,private cartInfoService : CartInfoService,private productService : ProductService,private paymentService:CheckoutService,private orderService: OrderService,private orderItemService: OrderItemService) { }

  ngOnInit() {
      
    this.orderDate = { 
      todayDate: this.getToday(),
      after3: this.getDeliveryAfter3(),
      after5: this.getDeliveryAfter5()

    }
    this.tDate={
      todayDate: this.getToday()
    }
   
    this.cartService.getCartList();
    this.cartService.cartList.subscribe((cArray:Array<Cart>)=>{
      this.cartDetails = cArray;
      if(cArray.length > 0)
      {
        this.arr1Length = cArray.length;
        this.totalQuantity = this.totalCart();
       
      }
    });
    this.cartInfoService.getCartInfoList();
    this.cartInfoService.cartListInfo.subscribe((cartArray:Array<CartInfo>)=>{
      this.cartInfo = cartArray;
      if(cartArray.length > 0){
       this.arr2Length = cartArray.length;
       this.totalP = this.totalPrice() * this.totalQuantity; 
      
       //this.totCost =  this.totalCost();
        
      }
     
    })
   
  
   

    this.customerService.GetUserClaims().subscribe((data: any)=>{
     this.userClaims = data;
    
   });

 
  }
  totalCart(){
  
    for(var counter = 0;counter<this.arr1Length;counter++){
     
      this.totQ += this.cartDetails[counter].CartQuantity;
     }
      
  return this.totQ;
  }
 
  totalPrice(){

    for(var counter = 0;counter<this.arr2Length;counter++){
     
      this.totP += this.cartInfo[counter].Price;
     }
      
  return this.totP;
  }
  getToday(){
    var today = new Date;
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    return dd +  '/' + mm + '/' + yyyy;
  }
  getDeliveryAfter3(){
    var today = new Date;
    var dd = today.getDate() + 3;
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    return dd +  '/' + mm + '/' + yyyy;
  }
  getDeliveryAfter5(){
    var today = new Date;
    var dd = today.getDate() + 5;
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    return dd +  '/' + mm + '/' + yyyy;
  }
   

  
  
  onSubmit() {
   
    this.order = {
      OrderID : 0,
      CustID: +localStorage.getItem("CustID"),
      OrderDate : '',
      DeliveryDate : ''
    }

    if((document.getElementById('todayDate') as HTMLInputElement).checked){
      this.order = {
        OrderID : 0,
        CustID: +localStorage.getItem("CustID"),
        OrderDate : this.tDate.todayDate,
        DeliveryDate : this.orderDate.todayDate
      }
      this.orderService.PostOrder(this.order).subscribe(data=> {
     
        this.orderService.GetOrder().subscribe((data: any) =>{
          this.order = Object.assign({},data.json());
        });
       this.toastr.info('Order Confirmed');
       var btnCont = document.getElementById("btnContinue") as HTMLInputElement;
       btnCont.disabled = false;
 
       var btnConf = document.getElementById("btnConfirm") as HTMLInputElement;
       btnConf.disabled = true;
      })
}else if((document.getElementById('after3') as HTMLInputElement).checked){
  this.order = {
    OrderID : 0,
    CustID: +localStorage.getItem("CustID"),
    OrderDate : this.tDate.todayDate,
    DeliveryDate : this.orderDate.after3
  }
        this.orderService.PostOrder(this.order).subscribe(data=> {
       
          this.orderService.GetOrder().subscribe((data: any) =>{
            this.order = Object.assign({},data.json());
          });
         this.toastr.info('Order Confirmed');
         var btnCont = document.getElementById("btnContinue") as HTMLInputElement;
         btnCont.disabled = false;
   
         var btnConf = document.getElementById("btnConfirm") as HTMLInputElement;
         btnConf.disabled = true;
        })
}else if((document.getElementById('after5') as HTMLInputElement).checked){  
  this.order = {
    OrderID : 0,
    CustID: +localStorage.getItem("CustID"),
    OrderDate : this.tDate.todayDate,
    DeliveryDate : this.orderDate.after5
  }
    this.orderService.PostOrder(this.order).subscribe(data=> {
      this.orderService.GetOrder().subscribe((data: any) =>{
        this.order = Object.assign({},data.json());
      });
     this.toastr.info('Order Confirmed');
     var btnCont = document.getElementById("btnContinue") as HTMLInputElement;
     btnCont.disabled = false;

     var btnConf = document.getElementById("btnConfirm") as HTMLInputElement;
     btnConf.disabled = true;
    })
  
 
}


}

onContinue(){
  this.orderService.GetOrder()
  .subscribe(data => {
   this.order = Object.assign({}, data.json());
   console.log(this.order.OrderID);
   localStorage.setItem("OrderID",this.order.OrderID+'')

      for (var i = 0; i < this.arr1Length; i++)
      {
        this.orderItem = {
          OrderItemID : 0,
          OrderID : this.order.OrderID,
          ProductID : this.cartDetails[i].ProductID,
          CustID : +localStorage.getItem('CustID')
        }
       
       

        this.orderItemService.PostOrderItem(this.orderItem)
        .subscribe(data => {
           
        })
        this.orderItemService.DeleteOrderItem(this.cartDetails[i].CartID)
        .subscribe(data => {
          
        })
       
      }
      this.toastr.success("Order Item" + i + " Added")

    this.router.navigate(['/orderItemDetails']);
  })

    

}




}

    
  

  