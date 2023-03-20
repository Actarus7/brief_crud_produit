import { IsString, IsNumber } from "class-validator";

export class CreateProduitDto {

    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsNumber()
    quantity: number;
};
