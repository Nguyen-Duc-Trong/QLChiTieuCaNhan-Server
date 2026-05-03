import { TransactionsEntity } from "./entities/transactions.entity";

export interface ITransaction {
	id: string;
	userId: string;
	money: number;
	description: string;
	date: Date;
	type: string | {
		label: string;
		value: string;
	};
	created_at: Date;
	updated_at: Date;
	categories: string | {
		id: string;
		name: string;
		// ... các trường khác của bảng categories
	};
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

export interface ResponseUpdateTransaction {
	message: string;
	statusCode: number;
}
