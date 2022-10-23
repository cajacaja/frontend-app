import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../domain';

import { UserSerivce } from '../services/user.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  filterBy = ['First Name', 'Last name', 'Username', 'Email', 'Status']
  userList: User[] = [];
  pages: any;
  totalPages = 0;
  pageSize = 10;
  page = 0;
  sortBy = '';

  constructor(
    private router: Router,
    private userService: UserSerivce
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.userService.getListOfUsers(this.page, this.pageSize, this.sortBy).subscribe((response) => {
      this.userList = response.data;
      this.totalPages = response.totalPages;
      this.pages = Array.from(Array(this.totalPages).keys())
    })
  }
  
  deleteUser(id?: number) {
    if(id){
      this.userService.deleteUser(id).subscribe(()=> {
        this.loadData();
      })
    }
  }

  goToCreate() {
    this.router.navigateByUrl('/create');
  }

  previousPage() {
    this.page--;
    this.loadData();
  }

  nextPage() {
    this.page++;
    this.loadData();
  }

  setPageNumber(page: number) {
    this.page = page;
    this.loadData();
  }

  onSelected(value: string) {
    switch(value) { 
      case this.filterBy[0]: { 
         this.sortBy = 'firstName';
         break; 
      } 
      case this.filterBy[1]: { 
         this.sortBy = 'lastName';
         break; 
      } 
      case this.filterBy[2]: { 
         this.sortBy = 'username';
         break; 
      } 
      case this.filterBy[3]: { 
         this.sortBy = 'email';
         break; 
      }
      case this.filterBy[4]: { 
        this.sortBy = 'status';
        break; 
      }  
      default: { 
        this.sortBy = '';
         break; 
      } 
    }
    this.page = 0;
    this.loadData();

  }

}
