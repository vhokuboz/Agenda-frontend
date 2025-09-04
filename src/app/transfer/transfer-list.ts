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
  page = 1;
  pageSize = 10;
  totalPages = 1;
  showModal = false;
  errorMsg: string[] = [];
  newTransfer: Transfer = {
    sourceAccount: '',
    destinationAccount: '',
    amount: 0,
    transferDate: ''
  };

  ngOnInit() {
    this.loadTransfers(this.page);
  }

  openModal() {
    this.showModal = true;
    this.errorMsg.slice(0, this.errorMsg.length);
    this.newTransfer = {
      sourceAccount: '',
      destinationAccount: '',
      amount: 0,
      transferDate: ''
    };
  }

  closeModal() {
    this.showModal = false;
  }

  submitTransfer() {
    this.errorMsg.splice(0, this.errorMsg.length);
    this.transferService.createTransfer(this.newTransfer)
      .subscribe({
        next: (resp) => {
          if (resp.status === 201) {
            this.closeModal();
            this.loadTransfers(this.page);
          }
        },
        error: (err) => {
          const errObject = JSON.parse(JSON.stringify(err.error));
          Object.values(errObject).forEach((textError) => this.errorMsg.push(String(textError)));
        }
      });
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.page = pageNumber;
      this.loadTransfers(this.page);
    }
  }

  private loadTransfers(page: number): void {
    this.transferService.loadTransfers(page).subscribe({
      next: ((transfers => {
        if (transfers.content.length) {
          this.transfers = transfers.content;
          this.totalPages = transfers.totalPages;
        }
      }))
    });
  }
}
