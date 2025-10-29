import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [
    CommonModule, RouterModule, MatCardModule, MatListModule,
    MatIconModule, MatButtonModule, MatProgressSpinnerModule
  ],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css'
})
export class CustomerDetailsComponent implements OnInit {
  private activatedRouter = inject(ActivatedRoute);
  private customerService = inject(CustomerService);
  customer: Customer | undefined;
  loading = true;

  ngOnInit(): void {
    const customerId = this.activatedRouter.snapshot.params['id'];
    if (customerId) {
      this.customerService.getById(customerId).subscribe({
        next: (data) => {
          this.customer = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('error:', err);
          this.loading = false;
        }
      });
    }
  }
}
