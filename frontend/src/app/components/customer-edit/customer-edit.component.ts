import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-customer-edit',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatButtonModule, RouterModule,
    MatFormFieldModule, MatInputModule, MatIconModule, MatSnackBarModule, MatCardModule
  ],
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.css'
})
export class CustomerEditComponent implements OnInit {
  private activatedRouter = inject(ActivatedRoute);
  private customerService = inject(CustomerService);
  private snack = inject(MatSnackBar);
  router = inject(Router);

  customerId!: string;
  form!: FormGroup;

  ngOnInit(): void {
    this.customerId = this.activatedRouter.snapshot.params['id'];
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required)
    });

    if (this.customerId) {
      this.customerService.getById(this.customerId).subscribe({
        next: (data) => this.form.patchValue(data),
        error: (err) => {
          this.snack.open('Failed to load customer data', 'Dismiss', { duration: 4000 });
          console.error(err);
        }
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.customerService.put(this.customerId, this.form.value).subscribe({
        next: () => {
          this.snack.open('Customer updated successfully!', 'OK', { duration: 3000 });
          this.router.navigate(['/customers']);
        },
        error: (err) => {
          this.snack.open('Failed to update customer', 'Dismiss', { duration: 4000 });
          console.error(err);
        }
      });
    }
  }
}
