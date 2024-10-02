import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class CybersoftTokenGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = request.headers['tokencybersoft'];
        if (!token) {
            throw new UnauthorizedException('Token Is Missing')
        }
        try {
            const decode = this.jwtService.decode(token) as { exp: number, HetHanTime: string }
            if (!decode) {
                throw new UnauthorizedException('Invalid Token')
            }
            const currentDate = new Date()
            const convertTimeNowToNumber = Number(currentDate.getTime())
            const convertTimeExpToNumber = Number(decode.HetHanTime)
            if (convertTimeNowToNumber > convertTimeExpToNumber) {
                throw new UnauthorizedException('Token has expired');
            }
            return true;
        } catch (err) {
            throw new UnauthorizedException('Token Expired Or Incorrect');
        }
    }
}