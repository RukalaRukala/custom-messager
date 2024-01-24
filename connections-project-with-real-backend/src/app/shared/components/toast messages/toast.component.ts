import { Component, HostBinding, inject } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toasts',
  template: `
    <div *ngFor="let toast of toastService.toasts">
      <ngb-toast
        [class]="toast.classname"
        [autohide]="true"
        [delay]="toast.delay || 5000"
        (hidden)="toastService.remove(toast)">
        <ng-template
          *ngTemplateOutlet="
            toast.template;
            context: { message: toast.message }
          "></ng-template>
      </ngb-toast>
    </div>
  `,
})
export class ToastsComponent {
  @HostBinding('class')
  elementClass =
    'toast-container position-fixed top-50 start-50 translate-middle p-3';

  @HostBinding('style.z-index')
  zIndex = 1200;

  toastService = inject(ToastService);
}
