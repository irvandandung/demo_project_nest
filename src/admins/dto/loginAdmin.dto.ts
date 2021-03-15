import { IsString, IsNumber, IsEmail, IsMobilePhone, IsNotEmpty,  MinLength } from 'class-validator';

export class LoginAdminDto {
 	@IsNotEmpty()
 	@IsString()
 	@IsEmail()
 	readonly email : string;
 	@IsNotEmpty()
 	@IsString()
 	@MinLength(6)
 	readonly password : string;

}