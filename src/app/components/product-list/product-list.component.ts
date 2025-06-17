import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title = 'Gerenciamento de Produtos';
  products: any[] = [];
  page = 0;
  size = 10;
  totalPages = 1;
  editingProduct: any = null;
  errorMessage: string = '';

  constructor(private productService: ProductService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll(this.page, this.size).subscribe({
      next: (response) => {
        this.products = response.content; // 🔥 Pegamos somente os produtos
        this.totalPages = response.totalPages; // 🔥 Atualiza número total de páginas
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);
      }
    });
  }

  getPages(): number[] {
    const pagesArray = [];
    for (let i = 0; i < this.totalPages; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  }

  goToPage(pageNumber: number): void {
    this.page = pageNumber;
    this.loadProducts();
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadProducts();
    }
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadProducts();
    }
  }

  startEdit(product: any): void {
    this.editingProduct = { ...product };
  }

  saveEdit(): void {
    if (this.editingProduct) {
      this.productService.update(this.editingProduct.id, this.editingProduct).subscribe({
        next: () => {
          const index = this.products.findIndex(p => p.id === this.editingProduct.id);
          if (index !== -1) {
            this.products[index] = { ...this.editingProduct };
          }
          this.editingProduct = null; // Fecha o modal
          this.errorMessage = '';
        },
        error: (err) => {
          console.error('Erro ao atualizar produto:', err.error);
          this.errorMessage = '❌ Falha ao atualizar produto. ' + err.error;
        }
      });
    }
  }

  cancelEdit(): void {
    this.editingProduct = null;
  }

  deleteProduct(id: number): void {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.productService.delete(id).subscribe({
        next: () => {
          this.products = this.products.filter(product => product.id !== id); //  Remove da lista sem recarregar a página
        },
        error: (err) => {
          console.error('Erro ao excluir produto:', err);
        }
      });
    }
  }
}
