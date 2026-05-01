import { IsEmail, MaxLength, MinLength, IsString, IsNotEmpty } from "class-validator";

export class RegisterDto {
	@IsEmail()
	@IsString()
	@IsNotEmpty()
	email: string;

	@IsString()
	@MinLength(6)
	@MaxLength(20)
	@IsNotEmpty()
	password: string;

	@IsString()
	@MinLength(2)
	@MaxLength(20)
	@IsNotEmpty()
	name: string;
}