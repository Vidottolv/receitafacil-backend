import { Column, CreateDateColumn, UpdateDateColumn ,Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user'})
export class UserEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;
    @Column({name:'name', nullable:false})
    name: string;
    @Column({name:'email', nullable:false})
    email: string;
    @Column({name:'phone', nullable:false})
    phone: string;
    @Column({name:'password', nullable:false})
    password: string;
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}