import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap, timestamp } from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('........');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        map(data => {
          data.loading_speed = Date.now() - now;
          console.log(Date.now() - now)
          return data;
        }),
      );
  }
}