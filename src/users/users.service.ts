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

	findOne(uuid: string): User{
		return this.users.find(User => User.uuid === uuid);
	}

	update(uuid: string, User : User){
		let indexUser = this.users.findIndex(User => User.uuid === uuid);
		this.users[indexUser] = User;
	}

	delete(uuid: string){
		let indexUser = this.users.findIndex(User => User.uuid === uuid);
		this.users.splice(indexUser, 1);
	}
}
