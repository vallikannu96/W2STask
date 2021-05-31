import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../classes/user';
import { NavService } from '../../service/nav.service';
import { AuthService } from '../../services/auth/auth.service';
import { GlobalService } from '../../services/auth/global.service';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public right_sidebar: boolean = false;
  public open: boolean = false;
  public openNav: boolean = false;
  public isOpenMobile : boolean;
  user: User;

  @Output() rightSidebarEvent = new EventEmitter<boolean>();

  constructor(public navServices: NavService,
    public globalService: GlobalService,
    public userService: UserService,
    public authService: AuthService) { 
      this.getUserData();
      this.userService.profPicasObservable.subscribe((val) =>{
        this.getUserData();
      });
  }

  getUserData(){
    this.userService.getUserData().subscribe( resp => {
      if(resp['status']){
        this.user = resp['user'];
      }else{
        console.log(resp);
      }
    },error =>{
      console.log(error);
    });
  }

  collapseSidebar() {
    this.open = !this.open;
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar
  }
  right_side_bar() {
    this.right_sidebar = !this.right_sidebar
    this.rightSidebarEvent.emit(this.right_sidebar)
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }

  logout(){
    this.authService.logout();
  }

  ngOnInit() {  }

}
