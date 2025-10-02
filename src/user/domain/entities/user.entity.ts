import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DatesEntity } from '../../../dates/domain/entities/dates.entity';
import { VehicleEntity } from "../../../vehicles/domain/entities/vechile.entity";

export enum UserRoleEnum {
    CLIENT='CLIENT',
    ADMIN='ADMIN'
}

@Entity({name: 'users'})
export class UserEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true , length: 50 , type: 'varchar' })
    email: string;

    @Column({ length: 60 , type: 'varchar' })
    password: string;

    @Column({ length: 100 , type: 'varchar' })
    name: string;

    @Column({ length: 100 , type: 'varchar' })
    lastName: string;

    @Column({ default: true, type: 'boolean' })
    isActive: boolean;

    @Column({ type: 'enum', enum: UserRoleEnum , default: UserRoleEnum.CLIENT })
    role: UserRoleEnum;

    @Column({type: 'varchar'})
    timezone: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => DatesEntity, date => date.user)
    dates: DatesEntity[];

    @OneToMany(() => VehicleEntity, vehicle => vehicle.owner)
    vehicles: VehicleEntity[];

}