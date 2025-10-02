import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../../user/domain/entities/user.entity";
import { VehicleEntity } from "../../../vehicles/domain/entities/vechile.entity";

export enum DateStatusEnum {
    ENABLED='ENABLED',
    DISABLED='DISABLED'
}

@Entity({name: 'dates'})
export class DatesEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp' })
    date: Date;

    @Column({ type: 'varchar', length: 255 })
    comments: string;

    @Column({ type: 'enum', enum: DateStatusEnum, default: DateStatusEnum.ENABLED })
    status: DateStatusEnum;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(() => UserEntity, user => user.dates)
    @JoinColumn()
    user: UserEntity;

    @ManyToOne(() => VehicleEntity, vehicle => vehicle.id)
    @JoinColumn()
    vehicle: VehicleEntity;

}