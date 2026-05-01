import { Body, Controller, Post, Req } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Post('register')
	async register(@Body() registerDto: RegisterDto) {
		return await this.authService.register(registerDto);
	}

	@Post('login')
	async login(@Body() loginDto: LoginDto) {
		return await this.authService.login(loginDto);
	}

	@Post('logout')
	async logout(@Req() req: Express.Request) {
		return await this.authService.logout(req);
	}
}