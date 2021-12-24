import { ApiProperty } from "@nestjs/swagger";
import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import { UserRoles } from "src/models/user-roles.model";
import { User } from "src/users/users.model";

// Интерфейс для обозначения полей, которые необходимы
// для создания экземпляра объекта (строки) таблицы на основе класса Role
interface RoleCreationAttrs{
    value: string;
    description: string;
}

@Table({ tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs>{
    @ApiProperty({example: '1', description: 'Уникальный идентификаторв'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'ADMIN', description: 'Значение роли пользователя'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @ApiProperty({example: 'Администратор', description: 'Описание роли'})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @BelongsToMany(() => User, () => UserRoles)
    users: User[];
}