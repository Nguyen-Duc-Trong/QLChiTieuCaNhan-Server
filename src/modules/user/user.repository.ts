import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterDto } from "../auth/dto/register.dto";

@Injectable()
export class UserRepository {
	constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

	async hasByEmail(email: string): Promise<boolean> {
		const user = await this.userRepository.findOne({ where: { email } });
		return user ? true : false;
	}

	async create(user: RegisterDto): Promise<void> {
		await this.userRepository.save(user);
	}

	//Hàm lấy thông tin người dùng khi đăng nhập thành công
	async findUserByEmail(email: string): Promise<UserEntity | null> {
		return this.userRepository.findOne({ where: { email } });
	}
}
