import { Component, inject, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ContactService } from '../../../../core/services/contact.service';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { ScrollAnimationDirective } from '../../../../shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, SectionHeaderComponent, ScrollAnimationDirective],
  template: `
    <section id="contact" class="section-padding">
      <div class="section-container">
        <app-section-header
          badge="// Contacto"
          title="Hablemos"
          subtitle="¿Tienes un proyecto en mente? Envíame un mensaje"
        />

        <div class="mx-auto grid max-w-5xl gap-8 lg:grid-cols-5">
          <!-- Contact info -->
          <div class="space-y-6 lg:col-span-2" appScrollAnimation>
            <div class="card">
              <h3 class="mb-6 text-lg font-semibold">Información de contacto</h3>

              @for (item of contactInfo; track item.label) {
                <div class="mb-5 flex items-start gap-4 last:mb-0">
                  <div
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                           bg-primary-500/10 text-primary-500"
                  >
                    <span class="text-lg">{{ item.icon }}</span>
                  </div>
                  <div>
                    <p class="text-sm text-surface-700 dark:text-surface-200">{{ item.label }}</p>
                    @if (item.link) {
                      <a
                        [href]="item.link"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="font-medium text-primary-500 transition-colors hover:text-primary-400"
                      >
                        {{ item.value }}
                      </a>
                    } @else {
                      <p class="font-medium">{{ item.value }}</p>
                    }
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Contact form -->
          <div class="lg:col-span-3" appScrollAnimation [appScrollDelay]="100">
            <form
              [formGroup]="form"
              (ngSubmit)="onSubmit()"
              class="card space-y-5"
            >
              <!-- Name -->
              <div>
                <label for="contact-name" class="mb-1.5 block text-sm font-medium">
                  Nombre
                </label>
                <input
                  id="contact-name"
                  formControlName="name"
                  type="text"
                  placeholder="Tu nombre"
                  class="input-field"
                />
                @if (showError('name')) {
                  <p class="mt-1 text-xs text-red-500">El nombre es requerido</p>
                }
              </div>

              <!-- Email -->
              <div>
                <label for="contact-email" class="mb-1.5 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="contact-email"
                  formControlName="email"
                  type="email"
                  placeholder="tu@email.com"
                  class="input-field"
                />
                @if (showError('email')) {
                  <p class="mt-1 text-xs text-red-500">
                    {{ form.get('email')?.errors?.['required'] ? 'El email es requerido' : 'Email inválido' }}
                  </p>
                }
              </div>

              <!-- Subject -->
              <div>
                <label for="contact-subject" class="mb-1.5 block text-sm font-medium">
                  Asunto
                </label>
                <input
                  id="contact-subject"
                  formControlName="subject"
                  type="text"
                  placeholder="Asunto del mensaje"
                  class="input-field"
                />
                @if (showError('subject')) {
                  <p class="mt-1 text-xs text-red-500">El asunto es requerido</p>
                }
              </div>

              <!-- Message -->
              <div>
                <label for="contact-message" class="mb-1.5 block text-sm font-medium">
                  Mensaje
                </label>
                <textarea
                  id="contact-message"
                  formControlName="message"
                  rows="5"
                  placeholder="Escribe tu mensaje aquí..."
                  class="input-field resize-none"
                ></textarea>
                @if (showError('message')) {
                  <p class="mt-1 text-xs text-red-500">
                    {{ form.get('message')?.errors?.['required']
                      ? 'El mensaje es requerido'
                      : 'El mensaje debe tener al menos 10 caracteres' }}
                  </p>
                }
              </div>

              <!-- Submit -->
              <button
                type="submit"
                [disabled]="contactService.sending()"
                class="btn-primary w-full justify-center disabled:opacity-50"
              >
                @if (contactService.sending()) {
                  <svg class="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Enviando...
                } @else {
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Enviar Mensaje
                }
              </button>

              <!-- Success / Error message -->
              @if (contactService.lastResponse(); as resp) {
                <div
                  class="rounded-xl p-4 text-center text-sm"
                  [class]="
                    resp.success
                      ? 'bg-accent-500/10 text-accent-600 dark:text-accent-400'
                      : 'bg-red-500/10 text-red-600 dark:text-red-400'
                  "
                >
                  {{ resp.message }}
                </div>
              }
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .input-field {
      width: 100%;
      padding: 0.75rem 1rem;
      border-radius: 0.75rem;
      border: 1px solid var(--color-surface-200);
      background: var(--color-surface-50);
      font-size: 0.875rem;
      transition: all 0.2s ease;
      outline: none;
    }

    .input-field:focus {
      border-color: var(--color-primary-500);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }

    :host-context(html.dark) .input-field {
      border-color: var(--color-surface-700);
      background: var(--color-surface-800);
      color: var(--color-surface-100);
    }

    :host-context(html.dark) .input-field:focus {
      border-color: var(--color-primary-500);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
    }

    .input-field::placeholder {
      color: var(--color-surface-700);
      opacity: 0.6;
    }
  `,
})
export class ContactComponent {
  readonly contactService = inject(ContactService);
  private fb = inject(FormBuilder);

  readonly submitted = signal(false);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  readonly contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'liebermenm@gmail.com',
      link: 'mailto:liebermenm@gmail.com',
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'Liebermen Morazán',
      link: 'https://www.linkedin.com/in/lieb-298025247/',
    },
    {
      icon: '💻',
      label: 'GitHub',
      value: 'Liebb',
      link: 'https://github.com/Liebb',
    },
    {
      icon: '🏢',
      label: 'Ubicación',
      value: 'Managua Nicaragua',
      link: null,
    },
  ];

  showError(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && (control.dirty || control.touched || this.submitted()));
  }

  async onSubmit(): Promise<void> {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const result = await this.contactService.send(this.form.getRawValue());
    if (result.success) {
      this.form.reset();
      this.submitted.set(false);
    }
  }
}
