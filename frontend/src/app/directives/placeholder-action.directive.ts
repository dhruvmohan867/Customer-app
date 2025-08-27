import { Directive, HostListener, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Directive({
  selector: '[appPlaceholderAction]',
  standalone: true   
})
export class PlaceholderActionDirective {
  @Input('appPlaceholderAction') targetRoute?: string;

  constructor(private snack: MatSnackBar, private router: Router) {}

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const snackRef = this.snack.open('This button is a placeholder', 'Go to Customers', {
      duration: 5000
    });

    snackRef.onAction().subscribe(() => {
      this.router.navigate([this.targetRoute || '/customers']);
    });
  }
}