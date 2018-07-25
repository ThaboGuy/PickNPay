import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin/shared/admin.service';
import { ToastrService } from 'ngx-toastr';
import { SupplierService } from './shared/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
  providers:[AdminService,SupplierService]
})
export class SupplierComponent implements OnInit {
  adminClaims: any;
  constructor(private router: Router,private adminService : AdminService,private supplierService : SupplierService,private toastr : ToastrService) { }

  ngOnInit() {
    this.adminService.GetAdminClaims().subscribe((data: any)=>{
      this.adminClaims = data;
    });
  }
  Logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
