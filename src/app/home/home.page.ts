import {PresentationElement} from '../services/stats.service';
import {Component, OnInit} from '@angular/core';
import {StatsPresentationCalculationService} from '../services/stats-presentation-calculation.service';
import { TableService } from '../services/table.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  dummyArr = [];
  presentation!: { [key: string]: PresentationElement[] };
  p=localStorage.getItem("p");
  b=localStorage.getItem("b")
  p_c=localStorage.getItem("p_c")
  b_c=localStorage.getItem("b_c")

  constructor(
    private statsHandler: StatsPresentationCalculationService,
    public tableservice:TableService,
    private cdr:ChangeDetectorRef
  ) {
    console.log(this.p_c)
    console.log(this.b_c)

  }

  ngOnInit(): void {
    this.updateDummyArray();
  }

  ionViewWillEnter(){
    console.log("enters")
    this.p=localStorage.getItem("p");
    this.b=localStorage.getItem("b")
    this.cdr.detectChanges()
  }

  ionViewDidEnter(){
    console.log("enters")
    this.p=localStorage.getItem("p");
    this.b=localStorage.getItem("b")
    this.cdr.detectChanges()
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
    this.tableservice.counterDsply--;
    clearInterval(this.tableservice.b);
    clearInterval(this.tableservice.p);

    this.tableservice.blinktextflagP=false;
    this.tableservice.blinktextflagB=false;
    this.statsHandler.tableService.deleteLastInput();

    this.statsHandler.tableService.tableDataObservable.next(this.statsHandler.tableService.tableData);
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

      if (!data || !data.length) {
        this.dummyArr = [];
      }
    });
  }
}
