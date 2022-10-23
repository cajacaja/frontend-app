import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import { User } from '../domain';


@Injectable()
export class UserSerivce{

    constructor(
        private httpClient: HttpClient
    ){}

    getListOfUsers(page: number, pageSize: number, sortBy?: string): Observable<any> {
        let params = new HttpParams({
            fromObject: {
                page: String(page),
                pageSize:String(pageSize)
            }
        });

        if(sortBy) {
           params = params.append('sortBy', sortBy);
        }
    
        return this.httpClient.get<any>('http://localhost:8080/api/user',{ params }).pipe(map(response => ({
            data: response.content,
            totalPages: response.totalPages
        })))
    }

    getUser(id: number): Observable<any> {
        return this.httpClient.get(`http://localhost:8080/api/user/${id}`);
    }

    addUser(createdUser: User ): Observable<any> {
        return this.httpClient.post<any>('http://localhost:8080/api/user', createdUser);
    }

    updateUser(id: Number, updateUser: User): Observable<any>  {
        return this.httpClient.put<any>(`http://localhost:8080/api/user/${id}`, updateUser)
    }

    updatePermissions(id: number, permissions: any) {
        return this.httpClient.put<any>(`http://localhost:8080/api/user/${id}/permissions`, permissions)
    }

    deleteUser(id: number):Observable<any> {
        return this.httpClient.delete<any>(`http://localhost:8080/api/user/${id}`)
    }
}