import { Injectable,BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { InsertAdminDto } from './dto/insertAdmin.dto';
import { LoginAdminDto } from './dto/loginAdmin.dto';
import { UserType } from '../global/enum/userType.enum';
import * as bcrypt from 'bcrypt';
import { AuthService } from './../auth/auth.service';
import { nameAdminEntity, Admin } from './interface/admin.interface'

@Injectable()
export class AdminsService {
	constructor(
		@InjectModel(nameAdminEntity) private readonly adminModel : Model<Admin>,
        private readonly authService : AuthService
	){}

	async insertAdmin(insertAdminDto : InsertAdminDto){
		const admin = new this.adminModel(insertAdminDto);
		let save = await admin.save();
		return save.id;
	}

	async updateAdmin(id : String, insertAdminDto : InsertAdminDto){
		let res = await this.adminModel.findByIdAndUpdate(id, {new : false, upsert : true}).exec();
		return res.id;
	}

	async findById(id : string){
		return await this.adminModel.findById(id).exec();
	}

	async loginAdmin(loginAdminDto : LoginAdminDto){
		let admin = await this.adminModel.findOne({email : loginAdminDto.email}).exec();
		if (!admin) throw new BadRequestException('Email not found!');
		let passCheck = await bcrypt.compare(loginAdminDto.password, admin.password);
		if(!passCheck) throw new BadRequestException('Password wrong!');
		let payload = {
			_id : admin._id,
			actor : admin._id,
			actorModel : UserType.ADMIN,
		}
        const response = await this.authService.login(payload);
		return { response, admin };
	}

	async list(
        skip?: number,
        limit?: number,
        sort?: string[],
        filter?: string[],
        search?: string[],
    ): Promise<[Admin[], number, number, number, string[]]> {
        const query = {};
        let filterQuery = [];
        filter.forEach((f: string) => {});
        if (filterQuery.length > 0) Object.assign(query, { $and: filterQuery });
        if (search && search.length > 0) {
            const searchQuery = [];
            for (var i = search.length - 1; i >= 0; i--) {
                const q = search[i] ? search[i].split('|') : [];
                if (q.length < 2) continue;
                const name = q[0];
                const value = q[1];
                searchQuery.push({ [name]: { $regex: '.*' + [value] + '.*' } });
            }
            Object.assign(query, { $or: searchQuery });
        }
        let cursor = this.adminModel.find(query);
        if (sort) cursor.sort({ [sort[0]]: sort[1] });
        if (skip) cursor.skip(skip);
        if (limit) cursor.limit(limit);
        const admins = await cursor.exec();
        const count = await this.adminModel.countDocuments(query);
        return [admins, skip, limit, count, filter];
    }
}
