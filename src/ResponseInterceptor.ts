import {
  CallHandler,
  ExecutionContext,
  HttpCode,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        content: data,
        message:
          context.switchToHttp().getResponse().statusCode <= 400
            ? 'SUCCESS'
            : 'ERROR',
        date: new Date(),
        statusCode: context.switchToHttp().getResponse().statusCode,
      })),
    );
  }
}
