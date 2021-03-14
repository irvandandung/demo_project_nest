import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/user.interface';
import { InsertUserDto } from './dto/insertUser.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel('User') private userModel : Model<User>
	){}

	async insert(insertUserDto: InsertUserDto){
		let insertUser = new this.userModel(insertUserDto);
		await insertUser.save();
	}	

	async findAll(): Promise<User[]> {
		return await this.userModel.find();
	}

	async list(
		skip?: number,
        limit?: number,
        sort?: string[],
        filter?: string,
	) : Promise<[User[], number, number, number, string]>{
		let query = {};
        let cursor = this.userModel.find(query).populate('name');
        if (skip) cursor.skip(skip);
        if (limit) cursor.limit(limit);
        if (sort) cursor.sort({ [sort[0]]: sort[1] });
        const users = await cursor.exec();
        const count = await this.userModel.countDocuments(query);

        return [users, skip, limit, count, filter];
	}
}
