import { StatsService } from './stats.service';
import { ElementRef, Injectable, QueryList } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  public tableData: any[];
  public tableDataObservable: BehaviorSubject<any>;
  counterDsply=-1;
  blinktextflagP=false;
  blinktextflagB=false;
  p:any;
  b:any;
  constructor(private statsService: StatsService) {
    this.tableData = [];
    this.tableDataObservable = new BehaviorSubject<any>(null);
  }

  addNewCol() {
    if (this.tableData.length > 0) {
      this.tableData.push([this.statsService.currentType]);
      this.statsService.currentColNumber++;
      this.statsService.oddOrEvenArr.push('O');
    } else {
      this.tableData.push([this.statsService.currentType]);
      this.statsService.currentColNumber = 0;
    }
    this.statsService.recalculateStats(
      true,
      this.statsService.currentType,
      this.tableData
    );
  }

  addNewRow() {
    if (this.tableData.length > 0) {
      this.tableData[this.statsService.currentColNumber].push(
        this.statsService.currentType
      );
    }
    this.statsService.recalculateStats(
      true,
      this.statsService.currentType,
      this.tableData
    );
  }

  deleteLastInput() {
    if (this.tableData.length > 0) {
      if (this.tableData[this.statsService.currentColNumber].length === 1) {
        this.tableData.pop();
        this.statsService.currentColNumber--;

        this.statsService.oddOrEvenArr.pop();
        this.statsService.recalculateStats(
          false,
          this.statsService.currentType,
          this.tableData
        );
        this.statsService.revertType();
      } else {
        this.tableData[this.statsService.currentColNumber].pop();
        this.statsService.recalculateStats(
          false,
          this.statsService.currentType,
          this.tableData
        );
      }
    }
  }

  clearAll() {
    this.statsService.currentColNumber = null;
    this.statsService.currentType = null;
    this.statsService.resetAllCounts();
    this.tableData = [];
    this.tableDataObservable.next(null);
  }
}
