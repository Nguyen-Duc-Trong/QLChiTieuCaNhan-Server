import { Injectable } from "@nestjs/common";
import { TransactionsRepository } from "./transactions.repository";
import { FindAllDto } from "./dto/findAll.dto";
import { CreateTransactionDto } from "./dto/create.dto";
import { ITransaction, ResponseCreateTransaction, ResponseDataTransactions } from "./transactions.interface";

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
				user_id: item.userId,
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

}