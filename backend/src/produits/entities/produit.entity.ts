import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('produits')
export class Produit extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;


    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    price: number;

    @ApiProperty()
    @Column()
    quantity: number;
};
