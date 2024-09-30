import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryColumn()
    userId: string

    @Column({default: 0})
    balance: number
}

