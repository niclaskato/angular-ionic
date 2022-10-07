import { TableService } from '../services/table.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  constructor(
    public tableService: TableService
  ) {}

  ngOnInit() {}
  goToPage2() {
    this.tableService.tableDataObservable.next(this.tableService.tableData);
  }
}
