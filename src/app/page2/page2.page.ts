import { TableService } from '../services/table.service';
import { Component, OnInit } from '@angular/core';
import {StatsPresentationCalculationService} from '../services/stats-presentation-calculation.service';
import {PresentationElement} from '../services/stats.service';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.page.html',
  styleUrls: ['./page2.page.scss'],
})
export class Page2Page implements OnInit {
  dummyArr = [];
  presentation!: { [key: string]: PresentationElement[] };
  p=localStorage.getItem("p");
  b=localStorage.getItem("b")
  p_c=localStorage.getItem("p_c")
  b_c=localStorage.getItem("b_c")
  constructor(private statsHandler: StatsPresentationCalculationService,public tableservice:TableService) {}

  ngOnInit() {
    this.updateDummyArray();
  }

  ionViewWillEnter(){
    this.p=localStorage.getItem("p");
    this.b=localStorage.getItem("b")
  
  }

  updateDummyArray(): void {
    this.statsHandler.tableService.tableDataObservable.subscribe((data) => {
      if (data) {
        this.dummyArr = [];
        data.forEach((arr: any[]) => {
          arr.forEach((element) => {
            this.dummyArr.push(element);
          });
        });

        this.statsHandler.init();
        this.presentation = this.statsHandler.statsService.presentation;
      }
    });
  }

  addHeadOrTail(type: string) {
    clearInterval(this.tableservice.b);
    clearInterval(this.tableservice.p);

    if(type==this.p){
      this.tableservice.blinktextflagB=false;
      this.tableservice.blinktextflagP=false;
       this.tableservice.p =setInterval(() =>{this.tableservice.blinktextflagP=!this.tableservice.blinktextflagP}, 500);
    }else{
      this.tableservice.blinktextflagP=false;
      this.tableservice.blinktextflagB=false;
      this.tableservice.b=setInterval(() =>{this.tableservice.blinktextflagB=!this.tableservice.blinktextflagB}, 500); 
    }
    this.tableservice.counterDsply++;
    if (
      type === this.statsHandler.statsService.currentType &&
      this.statsHandler.tableService.tableData.length > 0
    ) {
      this.statsHandler.tableService.addNewRow();
    } else {
      this.statsHandler.statsService.currentType = type;
      this.statsHandler.tableService.addNewCol();
    }

    this.statsHandler.tableService.tableDataObservable.next(this.statsHandler.tableService.tableData);
  }

  deleteLastInput() {
    this.statsHandler.tableService.deleteLastInput();

    this.statsHandler.tableService.tableDataObservable.next(this.statsHandler.tableService.tableData);
  }
}
