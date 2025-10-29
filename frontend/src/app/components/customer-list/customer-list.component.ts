import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    CommonModule, RouterModule, MatIconModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatTableModule,
    MatProgressSpinnerModule, MatSnackBarModule
  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {
  private api = inject(CustomerService);
  private snack = inject(MatSnackBar);

  loading = true;
  dataSource = new MatTableDataSource<Customer>([]);
  displayedColumns = ['name', 'email', 'phone', 'actions'];

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    this.loading = true;
    this.api.get().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.snack.open('Failed to load customers', 'Dismiss', { duration: 4000 });
        console.error(err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDeleteClick(customer: Customer) {
    if (typeof window !== 'undefined' && window.confirm(`Are you sure you want to delete ${customer.name}?`)) {
      this.api.delete(customer._id).subscribe({
        next: () => {
          this.snack.open('Customer deleted successfully', 'OK', { duration: 2500 });
          this.loadCustomers();
        },
        error: (err) => {
          this.snack.open('Failed to delete customer', 'Dismiss', { duration: 4000 });
          console.error(err);
        }
      });
    }
  }
}
