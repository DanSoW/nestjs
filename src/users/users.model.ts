import { ApiProperty } from "@nestjs/swagger";
import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import { UserRoles } from "src/models/user-roles.model";
import { Post } from "src/posts/posts.model";
import { Role } from "src/roles/roles.model";

// Интерфейс для обозначения полей, которые необходимы
// для создания экземпляра объекта (строки) таблицы на основе класса User
interface UserCreationAttrs{
    email: string;
    password: string;
}

@Table({ tableName: 'users'})
export class User extends Model<User, UserCreationAttrs>{
    @ApiProperty({example: '1', description: 'Уникальный идентификаторв'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес пользователя'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: 'рр8фцафшqwerya98H8h', description: 'Пароль пользователя'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'true', description: 'Забанен пользователь или нет'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    
    @ApiProperty({example: 'За нарушение правил', description: 'Причина бана'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @HasMany(() => Post)
    posts: Post[];
} 