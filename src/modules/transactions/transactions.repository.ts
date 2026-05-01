import { BadRequestException, Injectable } from "@nestjs/common";
import { TransactionsEntity } from "./entities/transactions.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FindAllDto } from "./dto/findAll.dto";
import { ITransactionsRepositoryResult } from "./transactions.interface";
import { CreateTransactionDto } from "./dto/create.dto";
import { UpdateTransactionDto } from "./dto/update.dto";

@Injectable()
export class TransactionsRepository {
	constructor(@InjectRepository(TransactionsEntity) private readonly TransactionsEntity: Repository<TransactionsEntity>) {
	}

	async create(body: CreateTransactionDto & { userId: string }): Promise<void> {
		const newTransaction = this.TransactionsEntity.create(body);
		await this.TransactionsEntity.save(newTransaction);
	}

	async update(id: string, payload: UpdateTransactionDto) {
		const checkId = await this.TransactionsEntity.findOne({ where: { id } });
		if (!checkId) {
			throw new BadRequestException("ID không hợp lệ!");
		}
		await this.TransactionsEntity.update(id, payload);
	}

	async delete() { }

	async findAll(params: FindAllDto): Promise<ITransactionsRepositoryResult> {
		const page = Number(params.page) || 1;
		const limit = Number(params.limit) || 10;
		const queryBuilder = this.TransactionsEntity.createQueryBuilder('transactions');
		queryBuilder.leftJoinAndSelect('transactions.categories', 'categories');
		queryBuilder.select([
			'transactions.id',
			'transactions.userId',
			'transactions.money',
			'transactions.description',
			'transactions.date',
			'transactions.type',
			'transactions.createdAt',
			'transactions.updatedAt',
			'categories.name',
		]);
		if (params.description) {
			queryBuilder.andWhere('transactions.description LIKE :description', { description: `%${params.description}%` });
		}
		if (params.money) {
			queryBuilder.andWhere('transactions.money = :money', { money: params.money });
		}
		if (params.date) {
			queryBuilder.andWhere('transactions.date = :date', { date: params.date });
		}
		if (params.type) {
			queryBuilder.andWhere('transactions.type = :type', { type: params.type });
		}
		if (params.categoriesId) {
			queryBuilder.andWhere('transactions.categoriesId = :categoriesId', { categoriesId: params.categoriesId });
		}
		// pagination
		queryBuilder.skip((page - 1) * limit);
		queryBuilder.take(limit);

		// ❗ cực kỳ quan trọng
		queryBuilder.orderBy('transactions.createdAt', 'DESC');

		// lấy data + total
		const [data, total] = await queryBuilder.getManyAndCount();

		return {
			data,
			pagination: {
				page,
				limit,
				total
			}
		};
	}
}