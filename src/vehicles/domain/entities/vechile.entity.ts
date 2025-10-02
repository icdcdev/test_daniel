import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../../user/domain/entities/user.entity";
import { DatesEntity } from "../../../dates/domain/entities/dates.entity";

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

    @OneToMany(() => DatesEntity, date => date.vehicle)
    dates: DatesEntity[];
}