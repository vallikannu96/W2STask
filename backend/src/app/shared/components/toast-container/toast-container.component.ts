import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from '../../services/common/toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
  host: { '[class.ngb-toasts]': 'true' }
})
export class ToastContainerComponent implements OnInit {
  constructor(public toastService: ToastService) { }

  ngOnInit(): void {
  }

  isTemplate(toast) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
