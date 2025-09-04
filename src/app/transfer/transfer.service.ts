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

  loadTransfers(page: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/transfers?page=${page}`);
  }

  createTransfer(data: Transfer): Observable<any> {
    const payload = {
      ...data,
      transferDate: new Date(data.transferDate).toISOString()
    };
    return this.http.post<Transfer>(`${this.baseUrl}/api/transfers`, payload, { observe: 'response' });
  }
}
