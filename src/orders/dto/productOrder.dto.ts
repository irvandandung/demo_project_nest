import { IsString, IsNotEmpty } from 'class-validator';

export class ProductOrderDto {
  @IsNotEmpty()
  @IsString()
  readonly _id: string;
  readonly name: string;
  readonly price: number;
}
