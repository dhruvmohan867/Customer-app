// theme-toggle.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService, ThemeMode } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <button mat-icon-button (click)="cycle()" [attr.aria-label]="title" [title]="title">
      <mat-icon>{{ icon }}</mat-icon>
    </button>
    <span class="theme-label">{{ title }}</span>
  `,
  styles: [`
    button { min-width: 40px; }
    .theme-label { margin-left: 8px; font-size: 14px; vertical-align: middle; }
  `]
})
export class ThemeToggleComponent {
  mode: ThemeMode = 'system';
  constructor(private theme: ThemeService) {
    this.mode = this.theme.getMode();
    this.theme.mode$.subscribe(m => this.mode = m);
  }

  get icon() {
    return this.mode === 'dark' ? 'dark_mode' : this.mode === 'light' ? 'light_mode' : 'settings_display';
  }
  get title() {
    return this.mode === 'dark' ? 'Dark mode' : this.mode === 'light' ? 'Light mode' : 'System (default)';
  }

  cycle() {
    const next: ThemeMode = this.mode === 'system' ? 'light' : this.mode === 'light' ? 'dark' : 'system';
    this.theme.setMode(next);
  }
}
