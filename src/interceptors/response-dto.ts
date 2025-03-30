
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseUserDto } from 'src/user/dto/user.create';

@Injectable()
export class TransformDtoInterceptor implements NestInterceptor {
    private readonly dto;
    constructor(dto: any) {
        this.dto = dto;
    }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map((data) => {
            return plainToInstance(this.dto,data,{
                excludeExtraneousValues: true
            })
        })
      );
  }
}
