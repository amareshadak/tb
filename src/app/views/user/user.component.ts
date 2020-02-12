import { Component, OnInit } from '@angular/core';
import { IUser, ResponseIUser } from '../../models/user';
import { ApiService } from '../../Services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  modelData: IUser[];
  constructor(private service: ApiService, private toastr: ToastrService) { }

  model: IUser = {
    id: '',
    name: '',
    designation: '',
    employee_id: '',
    login_id:'',
    password:'',
    role:''
  }

  // Store a copy of initial model
  initialModel = Object.assign({}, this.model);

  ngOnInit() {
    this.loadInitData();
  }

  loadInitData = () => {
    this.service.getAllUser().subscribe((resultData: ResponseIUser) => {
      console.log(resultData.payload)
      this.modelData = resultData.payload;
    })
  }

  submit = (f) => {
    console.log(this.model)
    this.service.addOrUpdateUser(this.model).subscribe((data: any) => {
      if(this.model.id == ''){
        this.loadInitData();
        this.toastr.success("Data saved successfully", "Success")
      }
      else{
        this.toastr.success("Data updated successfully", "Success")
      }
      this.model = this.initialModel;
      
    })
  }

  onEdit = (data: IUser) => {
    this.model = data;
  }
  

}
