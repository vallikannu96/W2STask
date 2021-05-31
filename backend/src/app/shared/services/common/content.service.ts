import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { InterfaceService } from '../auth/interface.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService extends InterfaceService {

  constructor(private http: HttpClient,
    private router: Router,) { 
    super();
  }

  // Content for owl carousel in login page
  getLoginOwlcarouselData(){
      return [
        {
          title: "Welcome to Dreamkart",
          desc: "You love online shopping. Because when it arrives it's like a present to YOU from YOU.",
        },
        {
          title: "Welcome to Dreamkart",
          desc: "If you can't stop thinking about it. Buy it.",
        },
        {
          title: "Welcome to Dreamkart",
          desc: "It's an ADD TO CART kind of day.",
        }
      ]
  }
}
