import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'timelog.component.html',
  styleUrls: ['./timelog.component.scss']
})
export class TimeLogComponent  implements OnInit {
    title = 'angular-datatables';
 
 
  rows = [];
 
  ngOnInit() {
    this.fetch((data) => {
      this.rows = data;
    });
  }
 
  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `http://swimlane.github.io/ngx-datatable/assets/data/company.json`);
 
    req.onload = () => {
      const data = JSON.parse(req.response);
      cb(data);
    };
 
    req.send();
  }
}
