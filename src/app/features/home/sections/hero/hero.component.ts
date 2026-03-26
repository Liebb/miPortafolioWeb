import { Component, inject, OnInit } from '@angular/core';
import { ScrollService } from '../../../../core/services/scroll.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section
      id="hero"
      class="relative flex min-h-screen items-center overflow-hidden"
    >
      <!-- Animated background -->
      <div class="absolute inset-0 -z-10">
        <!-- Gradient base -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-surface-950 via-primary-900/40 to-surface-950
                 dark:from-surface-950 dark:via-primary-900/30 dark:to-surface-950"
        ></div>

        <!-- Floating orbs -->
        <div
          class="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary-600/20 blur-3xl"
          style="animation: float 8s ease-in-out infinite;"
        ></div>
        <div
          class="absolute top-1/3 -right-20 h-72 w-72 rounded-full bg-accent-500/15 blur-3xl"
          style="animation: float 10s ease-in-out infinite 2s;"
        ></div>
        <div
          class="absolute -bottom-20 left-1/3 h-80 w-80 rounded-full bg-primary-500/10 blur-3xl"
          style="animation: float 12s ease-in-out infinite 4s;"
        ></div>

        <!-- Grid overlay -->
        <div
          class="absolute inset-0 opacity-[0.03]"
          style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
                 background-size: 60px 60px;"
        ></div>
      </div>

      <!-- Content -->
      <div class="section-container w-full px-4 pt-20 sm:px-6">
        <div class="flex flex-col items-center justify-between gap-12 lg:flex-row">
          <!-- Text -->
          <div class="max-w-2xl text-center lg:text-left" style="animation: fade-in 0.8s ease-out forwards;">
            <!-- Badge -->
            <div
              class="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-500/30
                     bg-primary-500/10 px-4 py-1.5"
              style="animation: slide-down 0.6s ease-out 0.3s both;"
            >
              <span class="h-2 w-2 rounded-full bg-accent-400 animate-pulse"></span>
              <span class="font-mono text-sm text-primary-400">
                Disponible para nuevos proyectos
              </span>
            </div>

            <!-- Name -->
            <h1
              class="mb-4 font-display text-4xl font-bold leading-tight tracking-tight
                     text-white sm:text-5xl md:text-6xl lg:text-7xl"
              style="animation: slide-up 0.6s ease-out 0.5s both;"
            >
              Hola, soy
              <br />
              <span class="gradient-text">Liebermen</span>
              <br />
              <span class="text-surface-200">Morazán</span>
            </h1>

            <!-- Role with typing effect -->
            <div
              class="mb-6 flex items-center justify-center gap-2 lg:justify-start"
              style="animation: slide-up 0.6s ease-out 0.7s both;"
            >
              <span class="font-mono text-lg text-primary-400 sm:text-xl">
                &lt;
              </span>
              <span class="font-mono text-lg text-surface-200 sm:text-xl">
                Ingeniero de Sistemas
              </span>
              <span class="font-mono text-lg text-primary-400 sm:text-xl">
                /&gt;
              </span>
            </div>

            <!-- Description -->
            <p
              class="mb-8 max-w-lg text-lg leading-relaxed text-surface-200 sm:text-xl"
              style="animation: slide-up 0.6s ease-out 0.9s both;"
            >
              Desarrollador apasionado por crear soluciones
              <span class="text-primary-400 font-medium">eficientes</span>,
              <span class="text-accent-400 font-medium">escalables</span> y con
              <span class="text-primary-300 font-medium">experiencia de usuario excepcional</span>.
            </p>

            <!-- CTAs -->
            <div
              class="flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
              style="animation: slide-up 0.6s ease-out 1.1s both;"
            >
              <button
                (click)="scrollTo('projects')"
                class="btn-primary group"
              >
                <span>Ver Proyectos</span>
                <svg
                  class="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button
                (click)="scrollTo('contact')"
                class="btn-outline border-surface-600 text-surface-200 hover:bg-surface-200 hover:text-surface-900"
              >
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Contáctame</span>
              </button>
            </div>

            <!-- Stats -->
            <div
              class="mt-12 flex items-center justify-center gap-8 lg:justify-start"
              style="animation: slide-up 0.6s ease-out 1.3s both;"
            >
              @for (stat of stats; track stat.label) {
                <div class="text-center">
                  <div class="font-display text-2xl font-bold text-white sm:text-3xl">
                    {{ stat.value }}
                  </div>
                  <div class="mt-1 text-xs text-surface-200 sm:text-sm">
                    {{ stat.label }}
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Visual element (code-like card) -->
          <div
            class="hidden lg:block"
            style="animation: scale-in 0.8s ease-out 0.8s both;"
          >
            <div
              class="relative w-80 rounded-2xl border border-surface-700/50 bg-surface-900/80
                     p-6 shadow-2xl backdrop-blur-sm xl:w-96"
            >
              <!-- Window dots -->
              <div class="mb-4 flex items-center gap-2">
                <div class="h-3 w-3 rounded-full bg-red-500/80"></div>
                <div class="h-3 w-3 rounded-full bg-yellow-500/80"></div>
                <div class="h-3 w-3 rounded-full bg-green-500/80"></div>
                <span class="ml-2 font-mono text-xs text-surface-200">developer.ts</span>
              </div>
              <!-- Code -->
              <pre class="font-mono text-sm leading-relaxed">
<span class="text-primary-400">const</span> <span class="text-accent-400">developer</span> = &#123;
  <span class="text-surface-200">nombre</span>: <span class="text-amber-400">"Liebermen"</span>,
  <span class="text-surface-200">rol</span>: <span class="text-amber-400">"Ing. de Sistemas"</span>,
  <span class="text-surface-200">empresa</span>: <span class="text-amber-400">"BAC"</span>,
  <span class="text-surface-200">skills</span>: [
    <span class="text-amber-400">"Angular"</span>,
    <span class="text-amber-400">"C#"</span>,
    <span class="text-amber-400">"SQL Server"</span>,
  ],
  <span class="text-surface-200">pasión</span>: <span class="text-amber-400">"Desarrollo de software"</span>,
&#125;;</pre>
              <!-- Glow -->
              <div
                class="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-primary-600/20
                       to-accent-500/20 blur-xl"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div
        class="absolute bottom-8 left-1/2 -translate-x-1/2"
        style="animation: slide-up 0.6s ease-out 1.5s both;"
      >
        <button
          (click)="scrollTo('about')"
          class="flex flex-col items-center gap-2 text-surface-200 transition-colors
                 hover:text-primary-400"
        >
          <span class="text-xs font-medium uppercase tracking-widest">Scroll</span>
          <svg class="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  `,
})
export class HeroComponent {
  private scrollService = inject(ScrollService);

  readonly stats = [
    { value: '5+', label: 'Años Exp.' },
    { value: '20+', label: 'Proyectos' },
    { value: '8+', label: 'Tecnologías' },
  ];

  scrollTo(sectionId: string): void {
    this.scrollService.scrollToSection(sectionId);
  }
}
