import { Component } from '@angular/core';
import { FilterSidebarComponent } from '../filter-sidebar/filter-sidebar.component';
import { ProductGridComponent } from '../product-grid/product-grid.component';
import { BannerComponent } from '../banner/banner.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    FilterSidebarComponent,
    ProductGridComponent,
    BannerComponent,
    HeaderComponent,
    FormsModule,
    CommonModule,
    FooterComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  public selectedSort = 'recommended';
  public showFilters = true;
  public selectedCategories: string[] = [];
  public totalProducts: number = 0;

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  onFilterChange(categories: string[]) {
    this.selectedCategories = categories;
  }

  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectSort(value: string) {
    this.selectedSort = value;
    this.dropdownOpen = false;
  }

  getLabel(value: string): string {
    switch (value) {
      case 'recommended':
        return 'RECOMMENDED';
      case 'byRating':
        return 'BY RATING';
      case 'priceHigh':
        return 'PRICE : HIGH TO LOW';
      case 'priceLow':
        return 'PRICE : LOW TO HIGH';
      default:
        return 'RECOMMENDED';
    }
  }

  getProductCount(count: number) {
    this.totalProducts = count;
  }
}
