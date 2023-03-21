import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, Length } from 'class-validator';
import { CreateProduitDto } from './create-produit.dto';

export class UpdateProduitDto extends PartialType(CreateProduitDto) {

    @IsString()
    @IsOptional()
    @Length(1)
    name: string;

    @IsNumber()
    @IsOptional()
    price: number;

    @IsNumber()
    @IsOptional()
    quantity: number;
};
