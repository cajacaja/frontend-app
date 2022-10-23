import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserPermissionsComponent } from './user-permissions/user-permissions.component';

const routes: Routes = [
    {
      path:'users/edit/:id',
      pathMatch: 'full',
      component: UserEditComponent
    },
    {
      path:'users/permissions/:id',
      pathMatch: 'full',
      component: UserPermissionsComponent
    },
    {
      path:'users/create',
      pathMatch: 'full',
      component: UserCreateComponent
    },
    {
      path:'users',
      pathMatch: 'full',
      component: UserListComponent
    },
    
    {path: '**' , pathMatch: 'full', redirectTo: 'users'}
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
