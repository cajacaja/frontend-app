import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { User } from '../domain';
import { UserSerivce } from '../services/user.service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  
  userId = 0;
  userStatus = ['Active', 'Inactive']

  userEditForm = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    status: new FormControl('')
  });

  constructor(
    private toastr: ToastrService,
    private userService: UserSerivce,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.userService.getUser(this.userId).subscribe((response) => {
          this.userEditForm.controls.firstName.setValue(response.firstName);
          this.userEditForm.controls.lastName.setValue(response.lastName);
          this.userEditForm.controls.email.setValue(response.email);
          this.userEditForm.controls.status.setValue(response.status);
      });
    })
  }

  onSubmit() {
    if(this.userEditForm.invalid) {
      return
    }

    const newUser = {
      firstName: this.userEditForm.controls.firstName.value!!,
      lastName: this.userEditForm.controls.lastName.value!!,
      email: this.userEditForm.controls.email.value!!,
      status: this.userEditForm.controls.status.value!!
    } as User;

    console.log(newUser.status);
    
    this.userService.updateUser(this.userId ,newUser).subscribe(() => {
      this.router.navigate(['users'])
    },(error) => {
      this.toastr.error(error.error.message, "Could not add user")
    })

  }

}
