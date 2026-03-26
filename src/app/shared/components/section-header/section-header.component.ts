import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  template: `
    <div class="mb-12 text-center">
      <span
        class="mb-4 inline-block rounded-full bg-primary-500/10 px-4 py-1.5 font-mono text-sm
               font-medium text-primary-500"
      >
        {{ badge() }}
      </span>
      <h2
        class="mb-4 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
      >
        <span class="gradient-text">{{ title() }}</span>
      </h2>
      @if (subtitle(); as sub) {
        <p class="mx-auto max-w-2xl text-lg text-surface-700 dark:text-surface-200">
          {{ sub }}
        </p>
      }
      <div class="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-accent-400"></div>
    </div>
  `,
})
export class SectionHeaderComponent {
  badge = input.required<string>();
  title = input.required<string>();
  subtitle = input<string>();
}
