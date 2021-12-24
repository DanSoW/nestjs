import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { UsersService } from "src/users/users.service";
import { ROLES_KEY } from "./role-auth-decorator";

@Injectable()
export class RolesGuard implements CanActivate{

    constructor(private jwtService: JwtService,
                private userService: UsersService,
                private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try{
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ]);

            if(!requiredRoles){
                return true;
            }

            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if((bearer !== 'Bearer') || (!token)){
                throw new UnauthorizedException({message: 'Пользователь не авторизован'});
            }

            const user = this.jwtService.verify(token);
            req.user = user;
            
            let result = user.roles.some(role => requiredRoles.includes(role.value));

            // Имеется уязвимость, связанная с тем, что токен можно подделать
            // и модифицировать пользовательскую информацию таким образом,
            // чтобы в его ролях был ADMIN

            return result;
        }catch(e){
            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
        }
    }
    
}