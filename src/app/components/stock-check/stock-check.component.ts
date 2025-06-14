import { Component } from '@angular/core';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-stock-check',
  templateUrl: './stock-check.component.html',
  styleUrls: ['./stock-check.component.css']
})
export class StockCheckComponent {
  productId!: number;
  stockMessage: string = '';
  stockStatus: string = '';

  constructor(private stockService: StockService) {}

  checkStock(): void {
    if (!this.productId || this.productId <= 0) {
      this.stockMessage = '❌ Informe um ID válido (maior que zero)!';
      return;
    }

    this.stockService.checkStock(this.productId).subscribe({
      next: (status) => {
        const parts = status.split(' | ');

        const produto = parts[0];     
        const quantidade = parts[1];  
        const statusText = parts[2]; 
        this.stockMessage = `${produto} | ${quantidade}`;

        const match = statusText.match(/Status:\s*(.*)$/);
        this.stockStatus = match ? match[1] : status;
      },
      error: (err) => {
        console.error('Erro ao verificar estoque:', err);
        this.stockMessage = err.error;
      }
    });
  }
}
