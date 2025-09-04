import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transfer, TransferService } from './transfer.service';

@Component({
  selector: 'app-transfer-list',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './transfer-list.html',
  styleUrls: ['./transfer-list.css']
})
export class TransferListComponent implements OnInit {
  private transferService = inject(TransferService);

  transfers: Transfer[] = [];
  

  ngOnInit() {
    this.loadTransfers();
  }



  private loadTransfers(): void {
    this.transferService.loadTransfers().subscribe({
      next: ((transfers => {
        this.transfers = transfers;
      }))
    });
  }
}
