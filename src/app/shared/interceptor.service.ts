import { HttpErrorResponse, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private toastr: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if(req.url.split('/')[req.url.split('/').length-1] == 'login') {
      return next.handle(req);
    }
    const newReq = req.clone({
      headers: req.headers
      .set('Authorization', 'Bearer ' + localStorage['token'])
    })
    return next.handle(newReq).pipe(
     tap(
        data => this.handleResponse(newReq, data),
        error => this.handleError(error)
     )
    )

  }

  handleResponse(req: HttpRequest<any>, data:any){

  }

  handleError(err: HttpErrorResponse) {
    this.toastr.error(err.error);
      console.log('intercepted Error>>', err);
  }
}
