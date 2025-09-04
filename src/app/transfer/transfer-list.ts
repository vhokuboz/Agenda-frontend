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
  showModal = false;
  errorMsg: string[] = [];
  newTransfer: Transfer = {
    sourceAccount: '',
    destinationAccount: '',
    amount: 0,
    transferDate: ''
  };

  ngOnInit() {
    this.loadTransfers();
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
    this.errorMsg.splice(0, this.errorMsg.length)
    this.transferService.createTransfer(this.newTransfer)
      .subscribe({
        next: (resp) => {
          if (resp.status === 201) {
            this.closeModal();
            this.loadTransfers();
          }
        },
        error: (err) => {
          const errObject = JSON.parse(JSON.stringify(err.error));
          Object.values(errObject).forEach((textError) => this.errorMsg.push(String(textError)));
        }
      });
  }

  private loadTransfers(): void {
    this.transferService.loadTransfers().subscribe({
      next: ((transfers => {
        this.transfers = transfers;
      }))
    });
  }
}
