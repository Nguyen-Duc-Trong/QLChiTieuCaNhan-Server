import { TransactionsEntity } from "./entities/transactions.entity";

export interface ITransaction {
	id: string;
	user_id: string;
	money: number;
	description: string;
	date: Date;
	type: string;
	created_at: Date;
	updated_at: Date;
	categories: string;
}

export interface ResponseDataTransactions<T> {
	data: T;
	pagination?: {
		page: number;
		limit: number;
		total: number;
	}
	message: string;
	statusCode: number;
}

export interface ResponseCreateTransaction {
	message: string;
	statusCode: number;
}

export interface ITransactionsRepositoryResult {
	data: TransactionsEntity[];
	pagination: {
		page: number;
		limit: number;
		total: number;
	};
}
