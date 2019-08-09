import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BakingTimeConfig } from '../../models/baking-time-config';
import { DashboardService } from '../../Services/dashboard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bakeing-time-config',
  templateUrl: './bakeing-time-config.component.html',
  styleUrls: ['./bakeing-time-config.component.scss']
})
export class BakeingTimeConfigComponent {
  constructor(private service: DashboardService,private toastr: ToastrService) { }
  model: BakingTimeConfig = {
    product_id: '',
    product_name: '',
    plant_id: '',
    bk_time: 0,
    t1_upper_limit: 0,
    t1_lower_limit: 0,
    t2_upper_limit: 0,
    t2_lower_limit: 0,
    t3_upper_limit: 0,
    t3_lower_limit: 0,
    t4_upper_limit: 0,
    t4_lower_limit: 0,
    t5_upper_limit: 0,
    t5_lower_limit: 0,
    t6_upper_limit: 0,
    t6_lower_limit: 0
  }
  // Store a copy of initial model

  initialModel = Object.assign({}, this.model);

  updateProductName(){
    this.products.forEach(element => {
      if(element.id == this.model.product_id){
        this.model.product_name = element.name;
      }
    });
    this.onChange();
  }
  onChange() {
    let product_id = this.model.product_id;
    let plant_id = this.model.plant_id;
    if (this.model.product_id != '' && this.model.plant_id != '') {
      this.service.getBakeTimeConfig().subscribe((data: BakingTimeConfig[]) => {
        let isSet = false;
        data.forEach(element => {
          if (this.model.product_id == element.product_id && this.model.plant_id == element.plant_id) {
            this.model = element;
            isSet = true;
          }
        });
        if (!isSet) {
          this.model = this.initialModel;
          this.model.product_id = product_id;
          this.model.plant_id = plant_id;
        }
      })
    }
    else {
      this.model = this.initialModel;
      this.model.product_id = product_id;
      this.model.plant_id = plant_id;
    }
  }

  submit = (f) => {
    this.service.addOrUpdateBakeTimeConfig(this.model).subscribe((data: any) => {
      this.onChange();
      this.toastr.success("Data saved successfully","Success")
    })
  }

  products = [
    { id: '', name: '--- Select Product ---' },
    { id: '1', name: 'MARIE GOLD' }
  ];

  plants = [
    { id: '', name: '--- Select Plant ---' },
    { id: '1', name: 'BARIPADA,ODISHA (SRI MAYUR BISCUIT)' },
    // { id: '2', name: 'Taratala Plant' },
    // { id: '3', name: 'Dhulagori Plant' },
    // { id: '4', name: 'Kharagpur Plant' },
    // { id: '5', name: 'Behala Plant' },
    // { id: '6', name: 'Durgapur Plant' },
    // { id: '7', name: 'Malda Plant' },
    // { id: '8', name: 'Horidebpur Plant' }
  ]

}
