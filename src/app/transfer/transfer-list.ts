import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
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

  transfers = signal<Transfer[]>([]);
  page = signal(1);
  pageSize = signal(10);
  totalPages = signal(1);
  showModal = signal(false);
  errorMsg = signal<string[]>([]);
  newTransfer = signal<Transfer>({
    sourceAccount: '',
    destinationAccount: '',
    amount: 0,
    transferDate: ''
  });

  ngOnInit() {
    this.loadTransfers(this.page());
  }

  openModal() {
    this.showModal.set(true);
    this.errorMsg.set([]);
    this.newTransfer.set({
      sourceAccount: '',
      destinationAccount: '',
      amount: 0,
      transferDate: ''
    });
  }

  closeModal() {
    this.showModal.set(false);
  }

  submitTransfer() {
    this.errorMsg.set([]);
    this.transferService.createTransfer(this.newTransfer())
      .subscribe({
        next: (resp) => {
          if (resp.status === 201) {
            this.closeModal();
            this.loadTransfers(this.page());
          }
        },
        error: (err) => {
          const errObject = JSON.parse(JSON.stringify(err.error));
          const errors = Object.values(errObject).map((textError) => String(textError));
          this.errorMsg.set(errors);
        }
      });
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages()) {
      this.page.set(pageNumber);
      this.loadTransfers(this.page());
    }
  }

  private loadTransfers(page: number): void {
    this.transferService.loadTransfers(page).subscribe({
      next: ((transfers => {
        if (transfers.content.length) {
          this.transfers.set(transfers.content);
          this.totalPages.set(transfers.totalPages);
        }
      }))
    });
  }
}
