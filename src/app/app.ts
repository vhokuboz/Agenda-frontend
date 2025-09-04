import { Component } from '@angular/core';
import { TransferListComponent } from './transfer/transfer-list';

@Component({
  selector: 'app-root',
  imports: [TransferListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App { }
