import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
 
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: toastOptons | {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
  
  get data(){
    return this.toasts;
  }
}

export interface toastOptons{
  classname: string;
  delay: number;
}
