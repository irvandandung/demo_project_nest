import { IsString, IsNumber, IsEmail, IsMobilePhone, IsNotEmpty,  MinLength, IsBoolean } from 'class-validator';

export interface UserOrder {
    _id : string;
    name : string;
    email : string;
    phone : string;
}