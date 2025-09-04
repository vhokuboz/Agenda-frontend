import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Transfer {
  id?: number;
  sourceAccount: string;
  destinationAccount: string;
  amount: number;
  transferDate: string;
  schedulingDate?: string;
  fee?: number
}

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  readonly baseUrl = 'http://localhost:8080' 
  private http = inject(HttpClient);

  loadTransfers(): Observable<Transfer[]> {
    return this.http.get<Transfer[]>(`${this.baseUrl}/api/transfers`);
  }

}
