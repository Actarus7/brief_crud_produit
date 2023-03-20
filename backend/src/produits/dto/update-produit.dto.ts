import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';
import { CreateProduitDto } from './create-produit.dto';

export class UpdateProduitDto extends PartialType(CreateProduitDto) {

    @IsString()
    @IsOptional()
    name: string;

    @IsNumber()
    @IsOptional()
    price: number;

    @IsNumber()
    @IsOptional()
    quantity: number;
};
