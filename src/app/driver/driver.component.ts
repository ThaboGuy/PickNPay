import { Component, OnInit } from '@angular/core';
import { DriverService } from './shared/driver.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin/shared/admin.service';
import { Driver } from './shared/driver.model';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
  providers:[AdminService,DriverService]
})
export class DriverComponent implements OnInit {
  adminClaims: any;
  selectedDriver: Driver;
  constructor(private router: Router,private adminService : AdminService,private driverService : DriverService,private toastr : ToastrService) { }

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
