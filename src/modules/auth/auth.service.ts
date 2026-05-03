import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) { }



	async register(user: RegisterDto): Promise<AuthResponse> {
		try {
			// console.log('AuthService: Bắt đầu xử lý đăng ký cho email:', user.email);
			const checkMail = await this.userService.hasByEmail(user.email);
			if (checkMail) {
				throw new BadRequestException("Email đã tồn tại!");
			}

			const passwordHash = await this.userService.hashPassword(user.password)
			await this.userService.create({
				email: user.email,
				name: user.name,
				password: passwordHash,
			});

			// console.log('AuthService: Đăng ký thành công cho email:', user.email);
			return { message: "Đăng ký thành công!" };
		} catch (error) {
			console.error('AuthService LỖI:', error);
			throw error;
		}
	}

	async login(user: LoginDto): Promise<TokenResponse> {
		const checkEmail = await this.userService.hasByEmail(user.email)
		if (!checkEmail) {
			throw new BadRequestException("Email hoặc mật khẩu không đúng!")
		}
		const dataUser = await this.userService.findUserByEmail(user.email)
		if (!dataUser) {
			throw new BadRequestException("Email hoặc mật khẩu không đúng!")
		}
		const checkPassword = await this.userService.comparePassword(user.password, dataUser.password)
		if (!checkPassword) {
			throw new BadRequestException("Email hoặc mật khẩu không đúng!")
		}

		const payload = { sub: dataUser.id, email: dataUser.email };
		const jwt = await this.jwtService.signAsync(payload);

		return { access_token: jwt };

	}

	async logout(req: any): Promise<AuthResponse> {
		req.session.destroy((err) => {
			if (err) {
				throw new BadRequestException("Đăng xuất thất bại!");
			}
		});
		return { message: "Đăng xuất thành công!" };
	}
}

export interface AuthResponse {
	message: string;
}

export interface TokenResponse {
	access_token: string;
}