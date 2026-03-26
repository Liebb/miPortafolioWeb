import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private meta = inject(Meta);
  private titleService = inject(Title);

  private readonly BASE_TITLE = 'Liebermen Morazán — Ingeniero de Sistemas';

  updateMeta(config: SeoConfig): void {
    const fullTitle = config.title
      ? `${config.title} | ${this.BASE_TITLE}`
      : this.BASE_TITLE;

    this.titleService.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: config.description });

    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({
      property: 'og:description',
      content: config.description,
    });
  }
}
