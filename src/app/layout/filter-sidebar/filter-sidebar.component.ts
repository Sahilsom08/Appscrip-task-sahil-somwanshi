import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-sidebar.component.html',
  styleUrl: './filter-sidebar.component.css',
})
export class FilterSidebarComponent {
  @Input() visible = true;
  @Output() categoryFilterChanged = new EventEmitter<string[]>();

  isMobileView = false;
  filters = [
    {
      title: 'IDEAL FOR',
      open: true,
      options: [
        { label: 'Mens', checked: false, value: "men's clothing" },
        { label: 'Womens', checked: false, value: "women's clothing" },
        { label: 'Electronics', checked: false, value: 'electronics' },
        { label: 'Jewelery', checked: false, value: 'jewelery' },
      ],
    },
    {
      title: 'OCCASION',
      open: true,
      options: [],
    },
    {
      title: 'WORK',
      open: true,
      options: [],
    },
    {
      title: 'FABRIC',
      open: true,
      options: [],
    },
  ];

  toggleFilter(index: number) {
    this.filters[index].open = !this.filters[index].open;
  }

  ngOnInit() {
    this.checkViewport();
    window.addEventListener('resize', this.checkViewport.bind(this));
  }

  checkViewport() {
    this.isMobileView = window.innerWidth <= 768;
  }

  onCategoryChange() {
    const selectedCategories = this.filters[0].options
      .filter((o) => o.checked)
      .map((o) => o.value);
    this.categoryFilterChanged.emit(selectedCategories);
  }
}
