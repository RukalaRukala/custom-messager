import { Injectable, TemplateRef } from '@angular/core';

export interface Toast {
  template: TemplateRef<unknown>;
  classname?: string;
  delay?: number;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: Toast[] = [];

  template!: TemplateRef<unknown>;

  show(toast: Toast) {
    this.toasts.push(toast);
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }

  showSuccess(message: string) {
    const template = this.template;
    this.show({
      template,
      classname: 'bg-success text-light',
      delay: 3000,
      message: message,
    });
  }

  showDanger(message: string) {
    const template = this.template;
    this.show({
      template,
      classname: 'bg-danger text-light',
      delay: 3000,
      message: message,
    });
  }

  showStandard(template: TemplateRef<unknown>) {
    this.show({ template });
  }
}
