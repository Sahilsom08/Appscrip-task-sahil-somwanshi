import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interface/data';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css',
})
export class ProductGridComponent {
  showFilters = true;
  @Input() sortBy = 'recommended';
  @Output() productCount = new EventEmitter<number>();
  @Input() selectedCategories: string[] = [];
  public products: Product[] = [];
  public productsBackup: Product[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  public toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  // get sortedProducts() {
  //   let products = this.productsBackup;

  //   if (this.selectedCategories && this.selectedCategories.length > 0) {
  //     products = products.filter((p) =>
  //       this.selectedCategories.includes(p.category)
  //     );
  //   }

  //   switch (this.sortBy) {
  //     case 'byRating':
  //       return products
  //         .slice()
  //         .sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0));
  //     case 'priceHigh':
  //       return products.slice().sort((a, b) => b.price - a.price);
  //     case 'priceLow':
  //       return products.slice().sort((a, b) => a.price - b.price);
  //     default:
  //       return products;
  //   }
  // }

  get sortedProducts() {
    let products = this.productsBackup;

    if (this.selectedCategories && this.selectedCategories.length > 0) {
      products = products.filter((p) =>
        this.selectedCategories.includes(p.category)
      );
    }

    let sorted: any[] = [];

    switch (this.sortBy) {
      case 'byRating':
        sorted = products
          .slice()
          .sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0));
        break;
      case 'priceHigh':
        sorted = products.slice().sort((a, b) => b.price - a.price);
        break;
      case 'priceLow':
        sorted = products.slice().sort((a, b) => a.price - b.price);
        break;
      default:
        sorted = products;
        break;
    }

    this.productCount.emit(sorted.length);
    return sorted;
  }

  private getAllProducts() {
    this.dataService.getProducts().subscribe({
      next: (data) => {
        this.productsBackup = data.map((p) => ({
          ...p,
          liked: false,
        }));
        this.products = [...this.productsBackup];
        this.productCount.emit(this.products.length);
      },
      error: (err) => console.error('Error fetching products:', err),
    });
  }

  public toggleLike(product: any): void {
    product.liked = !product.liked;
  }
}
