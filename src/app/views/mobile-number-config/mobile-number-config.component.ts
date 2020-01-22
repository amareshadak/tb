import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../../Services/dashboard.service';
import { MobileNumberConfig, IResponseMobileNumberConfig } from '../../models/mobile-number-config';
import { IPlant, IResopnseIPlant } from '../../models/plant';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-mobile-number-config',
  templateUrl: './mobile-number-config.component.html',
  styleUrls: ['./mobile-number-config.component.scss']
})
export class MobileNumberConfigComponent  {

  constructor(private service: DashboardService,private toastr: ToastrService,private apiService : ApiService) { }
  model: MobileNumberConfig = {
    plant_id: '',
    master_number: '',
    alt_number_one: '',
    alt_number_two: '',
    alt_number_three: '',
    alt_number_four: '',
    alt_number_five: '',
    alt_number_six: ''
  }
  // Store a copy of initial model
  initialModel = Object.assign({}, this.model);
  plants:  IPlant[]
  loadInitData = () => {
    this.apiService.getAllPlants().subscribe((resultData: IResopnseIPlant) => {
      this.plants = resultData.payload;
    })
  }

  ngOnInit() {
    this.loadInitData();
  }

  onChange() {
    let plant_id = this.model.plant_id;
    if (this.model.plant_id != '') {
      this.service.getMobileNumberConfig().subscribe((res: IResponseMobileNumberConfig) => {
        let data  = res.payload;
        let isSet = false;
        data.forEach(element => {
          if (this.model.plant_id == element.plant_id) {
            this.model = element;
            isSet = true;
          }
        });
        if (!isSet) {
          this.model = this.initialModel;
          this.model.plant_id = plant_id;
        }
      })
    }
    else {
      this.model = this.initialModel;
      this.model.plant_id = plant_id;
    }
  }

  submit = (f) => {
    this.service.addOrUpdateMobileNoConfig(this.model).subscribe((data: any) => {
      console.log(data)
      this.onChange();
      this.toastr.success("Data saved successfully","Success")
    })
  }
  
  // plants = [
  //   { id: '', name: '--- Select Plant ---' },
  //   { id: '1', name: 'BARIPADA,ODISHA (SRI MAYUR BISCUIT)' },
  //   // { id: '2', name: 'Taratala Plant' },
  //   // { id: '3', name: 'Dhulagori Plant' },
  //   // { id: '4', name: 'Kharagpur Plant' },
  //   // { id: '5', name: 'Behala Plant' },
  //   // { id: '6', name: 'Durgapur Plant' },
  //   // { id: '7', name: 'Malda Plant' },
  //   // { id: '8', name: 'Horidebpur Plant' }
  // ]

}
