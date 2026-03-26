import { Component } from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { ScrollAnimationDirective } from '../../../../shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SectionHeaderComponent, ScrollAnimationDirective],
  template: `
    <section id="about" class="section-padding">
      <div class="section-container">
        <app-section-header
          badge="// Sobre Mí"
          title="¿Quién soy?"
          subtitle="Ingeniero de Sistemas apasionado por el desarrollo de software"
        />

        <div class="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <!-- About text -->
          <div appScrollAnimation class="space-y-6">
            <div class="card card-hover">
              <div class="mb-4 flex items-center gap-3">
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10"
                >
                  <svg class="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold">Sobre mí</h3>
              </div>
              <p class="leading-relaxed text-surface-700 dark:text-surface-200">
                Soy <strong class="text-primary-500">Liebermen Morazán</strong>,
                Ingeniero de Sistemas con experiencia en el desarrollo de aplicaciones
                web y soluciones empresariales. Actualmente trabajo en el
                <strong>Banco de América Central (BAC)</strong>, donde aplico mis
                conocimientos en tecnologías modernas para crear sistemas robustos y
                eficientes.
              </p>
              <p class="mt-4 leading-relaxed text-surface-700 dark:text-surface-200">
                Me especializo en <strong class="text-primary-500">Angular</strong>,
                <strong class="text-primary-500">C#/.NET</strong> y el ecosistema de
                <strong class="text-primary-500">Microsoft</strong>, con un enfoque
                constante en las mejores prácticas, arquitectura limpia y experiencia
                de usuario de alta calidad.
              </p>
            </div>
          </div>

          <!-- Info cards -->
          <div class="space-y-4">
            @for (item of infoItems; track item.title; let i = $index) {
              <div
                appScrollAnimation
                [appScrollDelay]="i * 100"
                class="card card-hover flex items-start gap-4"
              >
                <div
                  class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                  [class]="item.bgClass"
                >
                  <span class="text-xl">{{ item.icon }}</span>
                </div>
                <div>
                  <h4 class="font-semibold">{{ item.title }}</h4>
                  <p class="mt-1 text-sm text-surface-700 dark:text-surface-200">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {
  readonly infoItems = [
    {
      icon: '💼',
      title: 'Experiencia Profesional',
      description:
        'Desarrollo de soluciones empresariales en el sector bancario, creando aplicaciones escalables y seguras.',
      bgClass: 'bg-primary-500/10',
    },
    {
      icon: '🎯',
      title: 'Enfoque Técnico',
      description:
        'Arquitectura limpia, código mantenible, rendimiento optimizado y experiencia de usuario excepcional.',
      bgClass: 'bg-accent-500/10',
    },
    {
      icon: '🚀',
      title: 'Aprendizaje Continuo',
      description:
        'Siempre explorando nuevas tecnologías y mejores prácticas para entregar soluciones de alto nivel.',
      bgClass: 'bg-amber-500/10',
    },
    {
      icon: '🏦',
      title: 'BAC — Banco de América Central',
      description:
        'Contribuyendo al desarrollo de sistemas financieros de alta disponibilidad y confiabilidad.',
      bgClass: 'bg-blue-500/10',
    },
  ];
}
