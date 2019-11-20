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
  constructor(private service: ApiService,private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getAllPlants().subscribe((resultData:IPlant[])=>{
      this.modelData=resultData;
    })
  }

}
