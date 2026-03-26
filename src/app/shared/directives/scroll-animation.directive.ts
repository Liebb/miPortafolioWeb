import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  inject,
  input,
} from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]',
  standalone: true,
})
export class ScrollAnimationDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private observer: IntersectionObserver | null = null;

  /** Delay in ms before animation starts */
  delay = input<number>(0, { alias: 'appScrollDelay' });

  ngOnInit(): void {
    const element = this.el.nativeElement as HTMLElement;
    element.classList.add('scroll-hidden');

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            element.classList.remove('scroll-hidden');
            element.classList.add('scroll-visible');
          }, this.delay());
          this.observer?.unobserve(element);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
