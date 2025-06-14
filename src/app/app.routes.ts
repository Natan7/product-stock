import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { StockCheckComponent } from './components/stock-check/stock-check.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },  // Página inicial
  { path: 'create', component: ProductFormComponent },  // Adicionar produto
  { path: 'check-stock', component: StockCheckComponent },  // Verificar estoque
  { path: '**', component: NotFoundComponent } // Captura qualquer URL inválida
];
