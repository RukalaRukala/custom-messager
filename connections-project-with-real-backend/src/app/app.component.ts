import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ToastService } from './shared/components/toast messages/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('toastMessage') template!: TemplateRef<unknown>;

  protected readonly localStorage = localStorage;

  constructor(private toastService: ToastService) {}

  ngAfterViewInit(): void {
    this.toastService.template = this.template;
  }
}
