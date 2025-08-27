// frontend/src/app/services/theme.service.ts
import { Injectable, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type ThemeMode = 'light' | 'dark' | 'system';
const KEY = 'app_theme_mode';

@Injectable({ providedIn: 'root' })
export class ThemeService implements OnDestroy {
  private _mode = new BehaviorSubject<ThemeMode>('system');
  readonly mode$ = this._mode.asObservable();

  private mql?: MediaQueryList | null;
  private mqlListener?: (e: MediaQueryListEvent) => void;

  // Inject platform id to check whether we're in the browser
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    const isBrowser = isPlatformBrowser(this.platformId);

    let saved: ThemeMode = 'system';

    if (isBrowser) {
      try {
        const s = localStorage.getItem(KEY) as ThemeMode | null;
        if (s === 'light' || s === 'dark' || s === 'system') {
          saved = s;
        }
      } catch (err) {
        // localStorage not available, keep default
      }
    }

    this._mode.next(saved);

    if (isBrowser) {
      this.apply(saved);

      try {
        this.mql = window.matchMedia('(prefers-color-scheme: dark)');
        this.mqlListener = (e: MediaQueryListEvent) => {
          if (this.getMode() === 'system') {
            this.apply('system');
          }
        };
        if (typeof this.mql.addEventListener === 'function') {
          this.mql.addEventListener('change', this.mqlListener);
        } else if (typeof (this.mql as any).addListener === 'function') {
          (this.mql as any).addListener(this.mqlListener);
        }
      } catch (err) {
        // ignore matchMedia errors
      }
    }
  }

  setMode(mode: ThemeMode) {
    const isBrowser = isPlatformBrowser(this.platformId);
    if (isBrowser) {
      try {
        localStorage.setItem(KEY, mode);
      } catch (err) {
        // ignore
      }
    }
    this._mode.next(mode);

    if (isBrowser) {
      this.apply(mode);
    }
  }

  getMode(): ThemeMode {
    return this._mode.value;
  }

  apply(mode: ThemeMode) {
    if (!isPlatformBrowser(this.platformId)) return;
    const prefersDark =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    const useDark = mode === 'dark' || (mode === 'system' && prefersDark);
    try {
      document.documentElement.classList.toggle('dark-theme', useDark);
    } catch (err) {
      // ignore DOM errors
    }
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.mql && this.mqlListener) {
      try {
        if (typeof this.mql.removeEventListener === 'function') {
          this.mql.removeEventListener('change', this.mqlListener);
        } else if (typeof (this.mql as any).removeListener === 'function') {
          (this.mql as any).removeListener(this.mqlListener);
        }
      } catch (err) {
        console.error('ThemeService.ngOnDestroy:', err);
      }
    }
  }
}
