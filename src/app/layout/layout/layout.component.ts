import { Component } from '@angular/core';
import { FilterSidebarComponent } from '../filter-sidebar/filter-sidebar.component';
import { ProductGridComponent } from '../product-grid/product-grid.component';
import { BannerComponent } from '../banner/banner.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  public selectedSort = 'recommended';
  public showFilters = true;
  public selectedCategories: string[] = [];

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  onFilterChange(categories: string[]) {
    this.selectedCategories = categories;
  }
}
