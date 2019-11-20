import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../Services/api.service';
import { IPlant } from '../../models/plant';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.scss']
})

export class PlantsComponent implements OnInit {
  modelData: IPlant[];
  constructor(private service: ApiService, private toastr: ToastrService) { }

  model: IPlant = {
    id: '',
    plant_id: '',
    plant_name: '',
    plant_location: ''
  }

  // Store a copy of initial model
  initialModel = Object.assign({}, this.model);

  ngOnInit() {
   this.loadInitData();
  }

  loadInitData = () => {
    this.service.getAllPlants().subscribe((resultData: IPlant[]) => {
      this.modelData = resultData;
    })
  }

  submit = (f) => {
    console.log(this.model)
    this.service.addOrUpdatePlant(this.model).subscribe((data: any) => {
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

  onEdit = (data: IPlant) => {
    this.model = data;
  }
  

}
