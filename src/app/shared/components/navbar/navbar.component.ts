import { Component, inject, signal, HostListener } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { ScrollService } from '../../../core/services/scroll.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <nav
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      [class]="scrolled() ? 'glass py-3 shadow-lg' : 'py-5 bg-transparent'"
    >
      <div class="section-container flex items-center justify-between px-4 sm:px-6">
        <!-- Logo -->
        <button
          (click)="navigateTo('hero')"
          class="group flex items-center gap-2 font-display text-xl font-bold tracking-tight"
        >
          <span
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-sm
                   font-bold text-white transition-transform group-hover:scale-110"
          >
            LM
          </span>
          <span class="hidden sm:inline">
            <span class="text-primary-500">Lieber</span><span>men</span>
          </span>
        </button>

        <!-- Desktop Navigation -->
        <div class="hidden items-center gap-1 md:flex">
          @for (item of navItems; track item.id) {
            <button
              (click)="navigateTo(item.id)"
              class="relative rounded-lg px-4 py-2 text-sm font-medium transition-colors
                     hover:text-primary-500"
              [class.text-primary-500]="scrollService.activeSection() === item.id"
            >
              {{ item.label }}
              @if (scrollService.activeSection() === item.id) {
                <span
                  class="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full
                         bg-primary-500 transition-all"
                ></span>
              }
            </button>
          }
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-3">
          <!-- Theme toggle -->
          <button
            (click)="themeService.toggle()"
            class="flex h-10 w-10 items-center justify-center rounded-xl transition-colors
                   hover:bg-surface-200 dark:hover:bg-surface-800"
            [attr.aria-label]="themeService.isDark() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
          >
            @if (themeService.isDark()) {
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            } @else {
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            }
          </button>

          <!-- Mobile menu button -->
          <button
            (click)="mobileMenuOpen.set(!mobileMenuOpen())"
            class="flex h-10 w-10 items-center justify-center rounded-xl md:hidden
                   hover:bg-surface-200 dark:hover:bg-surface-800"
            aria-label="Menú de navegación"
          >
            @if (mobileMenuOpen()) {
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            } @else {
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            }
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      @if (mobileMenuOpen()) {
        <div class="glass mx-4 mt-2 rounded-2xl p-4 md:hidden" (click)="mobileMenuOpen.set(false)">
          @for (item of navItems; track item.id) {
            <button
              (click)="navigateTo(item.id)"
              class="flex w-full rounded-xl px-4 py-3 text-left text-sm font-medium
                     transition-colors hover:bg-primary-500/10 hover:text-primary-500"
              [class.text-primary-500]="scrollService.activeSection() === item.id"
            >
              {{ item.label }}
            </button>
          }
        </div>
      }
    </nav>
  `,
})
export class NavbarComponent {
  readonly themeService = inject(ThemeService);
  readonly scrollService = inject(ScrollService);

  readonly scrolled = signal(false);
  readonly mobileMenuOpen = signal(false);

  readonly navItems = [
    { id: 'hero', label: 'Inicio' },
    { id: 'about', label: 'Sobre Mí' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contacto' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 50);
  }

  navigateTo(sectionId: string): void {
    this.mobileMenuOpen.set(false);
    this.scrollService.scrollToSection(sectionId);
  }
}
