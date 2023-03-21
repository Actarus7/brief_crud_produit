import { IsString, IsNumber, Length } from "class-validator";

export class CreateProduitDto {

    @IsString()
    @Length(1)
    name: string;

    @IsNumber()
    price: number;

    @IsNumber()
    quantity: number;
};
