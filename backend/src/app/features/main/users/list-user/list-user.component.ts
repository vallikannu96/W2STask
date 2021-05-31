import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/classes/user';
import { UserService } from 'src/app/shared/services/users/user.service';
import {ToastService} from "../../../../shared/services/common/toast.service";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  public user_list = [];

  constructor(private userService: UserService,
              private toastService: ToastService) {
  }

  public settings = {
    columns: {
      first_name: {
        title: 'First Name'
      },
      last_name: {
        title: 'Last Name'
      },
      email: {
        title: 'Email'
      },
      user_type: {
        title: 'Role'
      },
    },
    actions: {
      add : false,
      edit: false,
      position: 'right'
    },
    hideSubHeader: true,
    delete:{
      confirmDelete: true,
    },
    mode: 'inline',
  };

  ngOnInit() {
    this.userService.getUserList().subscribe(
      response => {
        this.user_list = response['users'];
      },
      error => {
        console.log(error);
      }
    )
  }

  confirmDelete(event){
    console.log(event);
    let isDelete: any;
    isDelete = confirm('Are you sure want to delete?');
    if(isDelete){
      let userId = event.data.id;
      this.userService.deleteUser(userId).subscribe( response => {
        this.toastService.show('User deleted successfully!', {classname: 'bg-success'});
        event.confirm.resolve(isDelete);
      },
      error => {
        this.toastService.show('Internal error. Please try again.', {classname: 'bg-danger'});
      });
    }else{
      console.log('not deleted');
    }
  }
}

