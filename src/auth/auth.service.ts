import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }
    async validateUser(account: string, pass: string): Promise<any> {
        const user = await this.userService.findUserByAccount(account)
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result
        }
        return null
    }
    async login(user: any) {
        const payload = { account: user.username, id: user.id, role: user.role }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
