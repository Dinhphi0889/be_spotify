import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class CheckTokenUser implements CanActivate {
  constructor(private readonly jwtService: JwtService) { }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = request.headers['token'] as string
    try {
      const decoded = this.jwtService.verify(token, { secret: 'testToken12333' })
      if (decoded) {
        return true;
      }
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

}