import { ApiProperty } from "@nestjs/swagger";
import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import { UserRoles } from "src/models/user-roles.model";
import { Role } from "src/roles/roles.model";
import { User } from "src/users/users.model";

interface PostCreationAttrs{
    title: string;
    content: string;
    userId: number;
    image: string;
}

@Table({ tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @Column({type: DataType.STRING })
    image: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @BelongsTo(() => User)
    author: User
}