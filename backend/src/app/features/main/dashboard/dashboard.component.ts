import { Component, OnInit } from '@angular/core';
import * as chartData from 'src/app/shared/data/chart';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { UserService } from 'src/app/shared/services/users/user.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  employees = [];
  showView : boolean = false;
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(
    private userService : UserService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.getEmployeesList();
  }

  ngOnInit() {

  }

  getEmployeesList(){
    this.userService.getEmployeeList().subscribe(
      response => {
        this.employees = response['employees'];
        if(this.employees.length){
          this.getDashboardData(this.employees[0]['id']);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  selectEmployee(event){
    console.log(event);
    this.getDashboardData(event);
  }

  getDashboardData(employee_id){
    this.userService.getDashboardData(employee_id).subscribe(
      response => {
        this.pieChartLabels = response['labels'];
        this.pieChartData = response['values'];
        if( this.pieChartData.length){
          this.showView = true;
        }else{
          this.showView = false;
        }
      },
      error => {
        console.log(error);
      }
    )
  }



}
