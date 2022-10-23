import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { User } from '../domain';
import { UserSerivce } from '../services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  userStatus = ['Active', 'Inactive']

  userForm = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    status: new FormControl(this.userStatus[0])
  });



  constructor(
    private userService: UserSerivce,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.userForm.invalid) {
      return
    }

    const newUser = {
      firstName: this.userForm.controls.firstName.value!!,
      lastName: this.userForm.controls.lastName.value!!,
      email: this.userForm.controls.email.value!!,
      username: this.userForm.controls.username.value!!,
      password: this.userForm.controls.password.value!!,
      status: this.userForm.controls.status.value!!
    } as User;

    console.log(newUser.status);
    
    this.userService.addUser(newUser).subscribe(() => {
      this.router.navigate(['users'])
    },(error) => {
      this.toastr.error(error.error.message, "Could not add user")
    })

  }

}
