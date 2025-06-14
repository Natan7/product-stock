import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  product = { nome: '', descricao: '', preco: 0, quantidadeEstoque: 0 };
  errorMessage: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  save(): void {
    this.productService.create(this.product).subscribe({
      next: () => {
        alert('Produto cadastrado com sucesso!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Erro ao atualizar produto:', err.error);
        this.errorMessage = '❌ Falha ao atualizar produto. ' + err.error;
      }
    });
  }
}
