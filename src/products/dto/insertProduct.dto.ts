import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class InsertProductDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsString()
  readonly category: string;
  @IsNotEmpty()
  @IsString()
  readonly description: string;
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;
  @IsNotEmpty()
  @IsNumber()
  readonly stock: number;
}
