import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto{
    
    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'Должно быть email строкой'})
    readonly email: string;
    
    @ApiProperty({example: '1234567890', description: 'Пароль'})
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: 'Длина пароля не может быть меньше 4 и больше 16'})
    readonly password: string;
}