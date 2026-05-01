import { IsString, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class LoginDto {
	@IsString()
	@IsNotEmpty()
	email: string;

	@IsString()
	@MinLength(6)
	@MaxLength(20)
	@IsNotEmpty()
	password: string;
}