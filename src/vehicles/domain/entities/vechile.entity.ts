import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../../user/domain/entities/user.entity";

@Entity({name: 'vehicles'})
export class VehicleEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', unique: true})
    vin: string;

    @Column({type: 'varchar'})
    year: string;

    @Column({type: 'varchar'})
    model: string;

    @Column({type: 'varchar', unique: true})
    plates: string;

    @Column({type: 'varchar'})
    color: string;

    @ManyToOne(() => UserEntity, user => user.vehicles)
    @JoinColumn()
    owner: UserEntity;
}