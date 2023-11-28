import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: false })
    name!: string

    @Column({ nullable: false })
    email!: string

    @Column({ nullable: false })
    password!: string

    @Column({ nullable: false })
    phone!: string

    @Column({ type: 'varchar', nullable: true })
    resetToken!: string | null;
  
    @Column({ type: 'timestamp', nullable: true })
    resetTokenExpiration!: Date | null;
}

