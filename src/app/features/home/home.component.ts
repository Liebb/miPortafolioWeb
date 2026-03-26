import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeroComponent } from './sections/hero/hero.component';
import { AboutComponent } from './sections/about/about.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { ContactComponent } from './sections/contact/contact.component';
import { ScrollService } from '../../core/services/scroll.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    AboutComponent,
    ProjectsComponent,
    SkillsComponent,
    ContactComponent,
  ],
  template: `
    <app-navbar />

    <main>
      <app-hero />
      <app-about />
      <app-projects />
      <app-skills />
      <app-contact />
    </main>

    <app-footer />
  `,
})
export class HomeComponent implements OnInit, OnDestroy {
  private scrollService = inject(ScrollService);
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.updateMeta({
      title: 'Portafolio',
      description:
        'Portafolio profesional de Liebermen Morazán — Ingeniero de Sistemas especializado en Angular, C#, .NET y desarrollo web moderno.',
      keywords: 'Angular, C#, .NET, SQL Server, JavaScript, Portfolio, Developer',
    });

    this.scrollService.observeSections([
      'hero',
      'about',
      'projects',
      'skills',
      'contact',
    ]);
  }

  ngOnDestroy(): void {
    this.scrollService.disconnect();
  }
}
