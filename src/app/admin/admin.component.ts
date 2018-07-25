import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from './shared/admin.service';
import { NgForm } from '@angular/forms';
import { Admin } from './shared/admin.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers:[AdminService]
})
export class AdminComponent implements OnInit {
  adminClaims : any;
  selectedAdmin : Admin;
  constructor(private router: Router,private adminService : AdminService,private toastr : ToastrService) { }

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
