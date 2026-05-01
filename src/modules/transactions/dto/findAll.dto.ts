import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator"

export class FindAllDto {
	@IsString()
	@IsOptional()
	description: string

	@IsNumber()
	@IsOptional()
	money: number
	@IsDateString()
	@IsOptional()
	date: string
	@IsString()
	@IsOptional()
	type: string

	@IsString()
	@IsOptional()
	categoriesId: string

	@IsNumber()
	@IsOptional()
	page: number = 1;

	@IsNumber()
	@IsOptional()
	limit: number = 10;

	@IsNumber()
	@IsOptional()
	total: number
}