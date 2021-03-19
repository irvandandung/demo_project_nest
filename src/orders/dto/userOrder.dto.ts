import { IsString, IsNotEmpty } from 'class-validator';

export class UserOrderDto {
	@IsNotEmpty()
	@IsString()
    readonly _id : string;
    readonly name : string;
    readonly email : string;
    readonly phone : string;
}