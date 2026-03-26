import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { ScrollAnimationDirective } from '../../../../shared/directives/scroll-animation.directive';
import { SKILL_ICONS } from './icons';

interface Skill {
  name: string;
  icon: string | SafeHtml;
  level: number; // 0 to 100
  color: string;
  category: 'frontend' | 'backend' | 'database' | 'tools';
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SectionHeaderComponent, ScrollAnimationDirective],
  template: `
    <section id="skills" class="section-padding bg-surface-100/50 dark:bg-surface-900/50">
      <div class="section-container">
        <app-section-header
          badge="// Habilidades"
          title="Stack Tecnológico"
          subtitle="Tecnologías con las que trabajo diariamente"
        />

        <!-- Category tabs -->
        <div class="mb-10 flex flex-wrap justify-center gap-2" appScrollAnimation>
          @for (cat of categories; track cat.id) {
            <button
              (click)="activeCategory = cat.id"
              class="rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300"
              [class]="
                activeCategory === cat.id
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-white text-surface-700 hover:bg-primary-50 hover:text-primary-600 dark:bg-surface-800 dark:text-surface-200 dark:hover:bg-surface-700'
              "
            >
              {{ cat.label }}
            </button>
          }
        </div>

        <!-- Skills grid -->
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          @for (skill of getFilteredSkills(); track skill.name; let i = $index) {
            <div
              appScrollAnimation
              [appScrollDelay]="i * 50"
              class="card card-hover group relative overflow-hidden"
            >
              <!-- Skill icon & name -->
              <div class="mb-4 flex items-center gap-3">
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-xl transition-transform
                         group-hover:scale-110"
                  [style.background-color]="skill.color + '15'"
                  [style.color]="skill.color"
                  [innerHTML]="skill.icon"
                >
                </div>
                <div>
                  <h3 class="font-semibold">{{ skill.name }}</h3>
                  <span class="text-xs text-surface-700 dark:text-surface-200">
                    {{ getLevelLabel(skill.level) }}
                  </span>
                </div>
              </div>

              <!-- Progress bar -->
              <div class="h-2 w-full overflow-hidden rounded-full bg-surface-200 dark:bg-surface-700">
                <div
                  class="h-full rounded-full transition-all duration-1000 ease-out"
                  [style.width.%]="skill.level"
                  [style.background-color]="skill.color"
                ></div>
              </div>

              <!-- Percentage -->
              <div class="mt-2 text-right text-xs font-medium" [style.color]="skill.color">
                {{ skill.level }}%
              </div>

              <!-- Hover glow -->
              <div
                class="absolute -bottom-2 -right-2 h-16 w-16 rounded-full opacity-0
                       transition-opacity group-hover:opacity-30 blur-xl"
                [style.background-color]="skill.color"
              ></div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* Aumentamos el tamaño de los SVGs a 28px */
    ::ng-deep .card svg {
      width: 28px;
      height: 28px;
    }
  `]
})
export class SkillsComponent {
  private sanitizer = inject(DomSanitizer);

  activeCategory: string = 'all';

  readonly categories = [
    { id: 'all', label: 'Todas' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: 'Base de Datos' },
    { id: 'tools', label: 'Herramientas' },
  ];

  readonly rawSkills: Skill[] = [
    { name: 'Angular', icon: SKILL_ICONS['angular'], level: 90, color: '#dd0031', category: 'frontend' },
    { name: 'HTML', icon: SKILL_ICONS['html5'], level: 95, color: '#e34c26', category: 'frontend' },
    { name: 'CSS', icon: SKILL_ICONS['css3'], level: 90, color: '#264de4', category: 'frontend' },
    { name: 'JavaScript', icon: SKILL_ICONS['javascript'], level: 88, color: '#f7df1e', category: 'frontend' },
    { name: 'TypeScript', icon: SKILL_ICONS['typescript'], level: 88, color: '#3178c6', category: 'frontend' },
    { name: 'Bootstrap', icon: SKILL_ICONS['bootstrap'], level: 85, color: '#7952b3', category: 'frontend' },
    { name: 'Tailwind', icon: SKILL_ICONS['tailwindcss'], level: 80, color: '#06b6d4', category: 'frontend' },
    { name: 'jQuery', icon: SKILL_ICONS['jquery'], level: 80, color: '#0769ad', category: 'frontend' },
    { name: 'C#', icon: SKILL_ICONS['csharp'], level: 85, color: '#178600', category: 'backend' },
    { name: 'Node.js', icon: SKILL_ICONS['nodedotjs'], level: 80, color: '#5fa04e', category: 'backend' },
    { name: 'SQL Server', icon: SKILL_ICONS['microsoftsqlserver'], level: 85, color: '#cc2927', category: 'database' },
    { name: 'DBeaver', icon: SKILL_ICONS['dbeaver'], level: 80, color: '#382923', category: 'database' },
    { name: 'Visual Studio', icon: SKILL_ICONS['visualstudio'], level: 85, color: '#5c2d91', category: 'tools' },
    { name: 'VS Code', icon: SKILL_ICONS['visualstudiocode'], level: 95, color: '#007acc', category: 'tools' },
    { name: 'Git & GitHub', icon: SKILL_ICONS['github'], level: 88, color: '#181717', category: 'tools' },
    { name: 'Azure DevOps', icon: SKILL_ICONS['azuredevops'], level: 80, color: '#0078d7', category: 'tools' },
    { name: 'SVN', icon: SKILL_ICONS['subversion'], level: 75, color: '#809cc9', category: 'tools' },
    { name: 'npm', icon: SKILL_ICONS['npm'], level: 85, color: '#cb3837', category: 'tools' },
    { name: 'Figma', icon: SKILL_ICONS['figma'], level: 78, color: '#f24e1e', category: 'tools' },
  ];

  readonly skills = this.rawSkills.map(skill => ({
    ...skill,
    icon: this.sanitizer.bypassSecurityTrustHtml(skill.icon as string)
  }));

  getFilteredSkills(): Skill[] {
    if (this.activeCategory === 'all') return this.skills;
    return this.skills.filter((s) => s.category === this.activeCategory);
  }

  getLevelLabel(level: number): string {
    if (level >= 90) return 'Experto';
    if (level >= 80) return 'Avanzado';
    if (level >= 60) return 'Intermedio';
    return 'Básico';
  }
}

