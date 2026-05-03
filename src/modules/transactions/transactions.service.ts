import { Injectable } from "@nestjs/common";
import { TransactionsRepository } from "./transactions.repository";
import { FindAllDto } from "./dto/findAll.dto";
import { CreateTransactionDto } from "./dto/create.dto";
import { ITransaction, ResponseCreateTransaction, ResponseDataTransactions, ResponseUpdateTransaction } from "./transactions.interface";
import { UpdateTransactionDto } from "./dto/update.dto";

@Injectable()
export class TransactionsService {
	constructor(private readonly transactionsRepository: TransactionsRepository) { }

	async findAllTransactions(params: FindAllDto): Promise<ResponseDataTransactions<ITransaction[]>> {
		const result = await this.transactionsRepository.findAll(params);

		if (!result || !result.data) {
			throw new Error('Lấy danh sách giao dịch thất bại');
		}

		const mapData = result.data.map((item: any) => {
			return {
				id: item.id,
				userId: item.userId,
				money: item.money,
				description: item.description,
				date: item.date,
				type: item.type,
				typeText: item.type === 'MONEYIN' ? 'Thu nhập' : 'Chi tiêu',
				created_at: item.createdAt,
				updated_at: item.updatedAt,
				categories: item.categories ? item.categories.name : ''
			}
		})

		return {
			message: 'Lấy danh sách giao dịch thành công',
			statusCode: 200,
			data: mapData,
			pagination: result.pagination,
		}
	}

	async createTransaction(body: CreateTransactionDto, userId: string): Promise<ResponseCreateTransaction> {
		const data = {
			...body,
			userId
		}
		await this.transactionsRepository.create(data);
		return {
			message: 'Thêm giao dịch thành công',
			statusCode: 200,
		}
	}

	async updateTransaction(id: string, payload: UpdateTransactionDto, userId: string): Promise<ResponseUpdateTransaction> {
		const data = {
			...payload,
			userId
		}
		await this.transactionsRepository.update(id, data);
		return {
			message: 'Cập nhật giao dịch thành công',
			statusCode: 200,
		}
	}

	async detailTransaction(id: string, userId: string): Promise<ResponseDataTransactions<ITransaction>> {
		const result = await this.transactionsRepository.findOne(id, userId);
		if (!result) {
			throw new Error('Lấy chi tiết giao dịch thất bại');
		}
		const mapData = {
			...result,
			type: result.type === 'MONEYIN' ? {
				label: 'Thu nhập',
				value: 'MONEYIN'
			} : {
				label: 'Chi tiêu',
				value: 'MONEYOUT'
			},
			created_at: result.createdAt,
			updated_at: result.updatedAt,
		}
		return {
			message: 'Lấy chi tiết giao dịch thành công',
			statusCode: 200,
			data: mapData,
		}
	}
}