import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { FindAllDto } from "./dto/findAll.dto";
import { CreateTransactionDto } from "./dto/create.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { User } from "src/common/decorators/user.decorator";

@Controller('transactions')
export class TransactionsController {
	constructor(private readonly transactionsService: TransactionsService) { }

	@UseGuards(JwtAuthGuard)
	@Get('list')
	async findAllDataTransactions(@Query() params: FindAllDto) {
		return this.transactionsService.findAllTransactions(params);
	}

	@UseGuards(JwtAuthGuard)
	@Post('create')
	async createTransaction(
		@Body() body: CreateTransactionDto,
		@User('id') userId: string
	) {
		return this.transactionsService.createTransaction(body, userId);
	}
}