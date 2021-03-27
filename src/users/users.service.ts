import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/user.interface';
import * as bcrypt from "bcrypt";
import { InsertUserDto } from './dto/insertUser.dto';
import { LoginUserDto } from "./dto/loginUser.dto";
import { AuthService } from "./../auth/auth.service";
import { UserType } from 'src/global/enum/userType.enum';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel('User') private userModel: Model<User>,
		private readonly authService: AuthService
	) { }

	async insert(insertUserDto: InsertUserDto) {
		const insertUser = new this.userModel(insertUserDto);
		let insert = await insertUser.save();
		return insert.id;
	}

	async update(id: String, insertUserDto: InsertUserDto) {
		let res = await this.userModel.findByIdAndUpdate(id, { new: false, upsert: true }).exec();
		return res.id;
	}

	async findAll(): Promise<User[]> {
		return await this.userModel.find();
	}

	async findById(id: String) {
		return await this.userModel.findById(id).exec();
	}

	async loginUser(loginUserDto: LoginUserDto) {
		let user = await this.userModel.findOne({ email: loginUserDto.email }).exec();
		if (!user) throw new BadRequestException('Email not found!');
		let passCheck = await bcrypt.compare(loginUserDto.password, user.password);
		if (!passCheck) throw new BadRequestException('Password wrong!');
		let payload = {
			_id: user._id,
			actor: user._id,
			actorModel: UserType.USER,
		}
		const response = await this.authService.login(payload);
		return { response, user };
	}

	async list(
		skip?: number,
		limit?: number,
		sort?: string[],
		filter?: string,
	): Promise<[User[], number, number, number, string]> {
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
