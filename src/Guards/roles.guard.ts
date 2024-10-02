import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/Types/role.enum';
import { ROLES_KEY } from './roles.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly jwtService: JwtService) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest()
    const token = request.headers['token-user'] as string
    const decoded = this.jwtService.verify(token, { secret: 'testToken12333' })
    if (requiredRoles[0] === decoded.role) {
      return true;
    } else {
      throw new ForbiddenException('You do not have permission to access this resource')
    }
  }
}