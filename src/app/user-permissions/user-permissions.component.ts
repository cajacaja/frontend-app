import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSerivce } from '../services/user.service';

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.scss']
})
export class UserPermissionsComponent implements OnInit {
  userId = 0;
  codePermission = false;
  descriptionPermission = false;
  permissinosId = 0;

  constructor(
    private userService: UserSerivce,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.userService.getUser(this.userId).subscribe((response) => {
        this.permissinosId = response.userPermission.id;
        this.codePermission = response.userPermission.code;
        this.descriptionPermission = response.userPermission.description;
      });
    })
  }

  changePermissions() {
    const newPermissions = {
      id: this.permissinosId,
      code: this.codePermission,
      description: this.descriptionPermission
    };

    this.userService.updatePermissions(this.userId, newPermissions).subscribe(()=> {
      this.router.navigate(['users'])
    })
  }

}
