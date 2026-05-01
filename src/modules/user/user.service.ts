import * as bcrypt from 'bcrypt';
import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { RegisterDto } from '../auth/dto/register.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) { }

	async create(user: RegisterDto): Promise<void> {
		await this.userRepository.create(user);
	}


	async hasByEmail(email: string): Promise<boolean> {
		return this.userRepository.hasByEmail(email);
	}

	//Hàm mã hóa mật khẩu
	async hashPassword(password: string): Promise<string> {
		return bcrypt.hash(password, 10);
	}

	//Hàm so sánh mật khẩu
	async comparePassword(password: string, hash: string): Promise<boolean> {
		return bcrypt.compare(password, hash);
	}

	//Hàm lấy thông tin người dùng khi đăng nhập thành công
	//Hàm lấy thông tin người dùng khi đăng nhập thành công
	async findUserByEmail(email: string): Promise<UserEntity | null> {
		return this.userRepository.findUserByEmail(email);
	}
}