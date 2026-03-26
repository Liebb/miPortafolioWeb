import { Injectable, signal } from '@angular/core';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  readonly sending = signal<boolean>(false);
  readonly lastResponse = signal<ContactResponse | null>(null);

  /**
   * Sends a contact form message.
   * Currently simulated — replace this method body with a real HTTP call
   * to your backend, EmailJS, Formspree, etc.
   *
   * Example with a real backend:
   * ```ts
   * return this.http.post<ContactResponse>('/api/contact', data);
   * ```
   */
  async send(data: ContactFormData): Promise<ContactResponse> {
    this.sending.set(true);
    this.lastResponse.set(null);

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulated success
      console.log('📧 Contact form data:', data);

      const response: ContactResponse = {
        success: true,
        message: '¡Mensaje enviado correctamente! Te responderé pronto.',
      };

      this.lastResponse.set(response);
      return response;
    } catch {
      const response: ContactResponse = {
        success: false,
        message: 'Error al enviar el mensaje. Intenta de nuevo.',
      };

      this.lastResponse.set(response);
      return response;
    } finally {
      this.sending.set(false);
    }
  }
}
