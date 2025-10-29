import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-customer-create',
  standalone: true,
  imports: [
    MatButtonModule, RouterModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatIconModule, MatSnackBarModule, MatCardModule
  ],
  templateUrl: './customer-create.component.html',
  styleUrl: './customer-create.component.css'
})
export class CustomerCreateComponent implements OnInit {
  private customerService = inject(CustomerService);
  private snack = inject(MatSnackBar);
  router = inject(Router);
  form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.customerService.post(this.form.value).subscribe({
        next: () => {
          this.snack.open('Customer created successfully!', 'OK', { duration: 3000 });
          this.router.navigate(['/customers']);
        },
        error: (err) => {
          this.snack.open('Failed to create customer', 'Dismiss', { duration: 4000 });
          console.error(err);
        }
      });
    }
  }
}
