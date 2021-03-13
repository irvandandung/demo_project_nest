import { Injectable } from '@nestjs/common';
import { User } from './interface/user.interface';

@Injectable()
export class UsersService {
	private readonly users : User[] = [];

	insert(user : User){
		this.users.push(user);
	}	

	findAll() : User[]{
		return this.users;
	}
}
