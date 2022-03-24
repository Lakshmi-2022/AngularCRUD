import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formvalue!:FormGroup;
  employeeModelObj:EmployeeModel=new EmployeeModel();
  employeeData!:any;
  constructor(private formbuilder:FormBuilder, private api:ApiService) 
  {
    
  }

  ngOnInit(): void {
    this.formvalue=this.formbuilder.group({
      firstname:[''],
      lastname:[''],
      email:[''],
      mobile:[''],
      salary:['']
    })
    this.getEmployeeDetails();
  }
postEmployeeDetails()
{
  this.employeeModelObj.firstname=this.formvalue.value.firstname;
  this.employeeModelObj.lastname=this.formvalue.value.lastname;
  this.employeeModelObj.email=this.formvalue.value.email;
  this.employeeModelObj.mobile=this.formvalue.value.mobile;
  this.employeeModelObj.salary=this.formvalue.value.salary;
  
  this.api.postEmployee(this.employeeModelObj)
  .subscribe(res=>{
    console.log(res);
    alert('Employee Added Successfully');
    this.getEmployeeDetails();
    let ref=document.getElementById('cancel')
    ref?.click();
    this.formvalue.reset();
  },
  err=>{
alert('Something Went Wrong');
  }
  )
  
}
getEmployeeDetails()
{
this.api.getEmployee()
.subscribe(res=>{
  this.employeeData=res;
})
}
}
