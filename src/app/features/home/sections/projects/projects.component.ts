import { Component, inject, OnInit } from '@angular/core';
import { GitHubService } from '../../../../core/services/github.service';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { ScrollAnimationDirective } from '../../../../shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [SectionHeaderComponent, ScrollAnimationDirective],
  template: `
    <section id="projects" class="section-padding">
      <div class="section-container">
        <app-section-header
          badge="// Proyectos"
          title="Mi Trabajo"
          subtitle="Repositorios públicos en GitHub — actualizados en tiempo real"
        />

        <!-- Error / Rate limit message -->
        @if (githubService.error(); as errorMsg) {
          <div
            class="mx-auto mb-8 max-w-lg rounded-xl border border-amber-500/30 bg-amber-500/10
                   p-4 text-center text-sm text-amber-600 dark:text-amber-400"
          >
            <svg class="mx-auto mb-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            {{ errorMsg }}
          </div>
        }

        <!-- Loading skeletons -->
        @if (githubService.loading()) {
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            @for (i of [1, 2, 3, 4, 5, 6]; track i) {
              <div class="card animate-pulse">
                <div class="mb-3 h-4 w-2/3 rounded bg-surface-200 dark:bg-surface-700"></div>
                <div class="mb-2 h-3 w-full rounded bg-surface-200 dark:bg-surface-700"></div>
                <div class="mb-4 h-3 w-4/5 rounded bg-surface-200 dark:bg-surface-700"></div>
                <div class="flex gap-2">
                  <div class="h-6 w-16 rounded-full bg-surface-200 dark:bg-surface-700"></div>
                  <div class="h-6 w-12 rounded-full bg-surface-200 dark:bg-surface-700"></div>
                </div>
              </div>
            }
          </div>
        }

        <!-- Repo cards -->
        @if (!githubService.loading() && githubService.filteredRepos().length > 0) {
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            @for (repo of githubService.filteredRepos(); track repo.id; let i = $index) {
              <a
                [href]="repo.html_url"
                target="_blank"
                rel="noopener noreferrer"
                appScrollAnimation
                [appScrollDelay]="i * 80"
                class="card card-hover group relative block overflow-hidden"
              >
                <!-- Gradient border glow on hover -->
                <div
                  class="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-primary-500/0
                         via-primary-500/0 to-accent-500/0 opacity-0 blur-sm transition-all
                         duration-500 group-hover:from-primary-500/20 group-hover:via-accent-500/10
                         group-hover:to-primary-500/20 group-hover:opacity-100"
                ></div>

                <!-- Header -->
                <div class="mb-3 flex items-start justify-between">
                  <div class="flex items-center gap-2">
                    <svg
                      class="h-5 w-5 text-primary-500 transition-transform group-hover:scale-110"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <h3 class="font-semibold transition-colors group-hover:text-primary-500">
                      {{ repo.name }}
                    </h3>
                  </div>
                  <svg
                    class="h-4 w-4 text-surface-700 transition-transform group-hover:translate-x-1
                           group-hover:-translate-y-1 group-hover:text-primary-500
                           dark:text-surface-200"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>

                <!-- Description -->
                <p class="mb-4 line-clamp-2 text-sm leading-relaxed text-surface-700 dark:text-surface-200">
                  {{ repo.description || 'Sin descripción disponible' }}
                </p>

                <!-- Footer -->
                <div class="flex flex-wrap items-center gap-3 text-xs text-surface-700 dark:text-surface-200">
                  @if (repo.language) {
                    <span class="flex items-center gap-1.5">
                      <span
                        class="h-2.5 w-2.5 rounded-full"
                        [style.background-color]="getLanguageColor(repo.language)"
                      ></span>
                      {{ repo.language }}
                    </span>
                  }
                  @if (repo.stargazers_count > 0) {
                    <span class="flex items-center gap-1">
                      <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      {{ repo.stargazers_count }}
                    </span>
                  }
                  @if (repo.forks_count > 0) {
                    <span class="flex items-center gap-1">
                      <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      {{ repo.forks_count }}
                    </span>
                  }
                </div>
              </a>
            }
          </div>
        }

        <!-- Empty state -->
        @if (!githubService.loading() && githubService.filteredRepos().length === 0 && !githubService.error()) {
          <div class="py-12 text-center text-surface-700 dark:text-surface-200">
            <p>No se encontraron repositorios en este momento.</p>
          </div>
        }

        <!-- GitHub profile link -->
        <div class="mt-12 text-center" appScrollAnimation>
          <a
            href="https://github.com/Liebb"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-outline"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Ver perfil completo en GitHub
          </a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `,
})
export class ProjectsComponent implements OnInit {
  readonly githubService = inject(GitHubService);

  private languageColors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    'C#': '#178600',
    HTML: '#e34c26',
    CSS: '#563d7c',
    SCSS: '#c6538c',
    Python: '#3572A5',
    Java: '#b07219',
    Shell: '#89e051',
  };

  ngOnInit(): void {
    this.githubService.loadRepos();
  }

  getLanguageColor(language: string): string {
    return this.languageColors[language] ?? '#8b949e';
  }
}
