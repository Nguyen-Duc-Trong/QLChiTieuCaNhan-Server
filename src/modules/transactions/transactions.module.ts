import { Module } from "@nestjs/common";
import { TransactionsController } from "./transactions.controller";
import { TransactionsService } from "./transactions.service";
import { TransactionsRepository } from "./transactions.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionsEntity } from "./entities/transactions.entity";

@Module({
	imports: [TypeOrmModule.forFeature([TransactionsEntity])],
	controllers: [TransactionsController],
	providers: [TransactionsService, TransactionsRepository],
	exports: [TransactionsService, TransactionsRepository],
})
export class TransactionsModule { }