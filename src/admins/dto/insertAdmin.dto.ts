import { IsString, IsNumber, IsEmail, IsMobilePhone, IsNotEmpty,  MinLength } from 'class-validator';

export class InsertAdminDto {
	@IsNotEmpty()
	@IsString()
	readonly firstName : string;
	@IsString()
 	readonly lastName: string;
 	@IsNotEmpty()
 	@IsString()
 	@IsEmail()
 	readonly email : string;
 	@IsNotEmpty()
 	@IsString()
 	@IsMobilePhone('id-ID')
 	readonly phoneNumber : string;
 	@IsNotEmpty()
 	@IsString()
 	@MinLength(6)
 	readonly password : string;
 	readonly dateOfBirth : Date
}