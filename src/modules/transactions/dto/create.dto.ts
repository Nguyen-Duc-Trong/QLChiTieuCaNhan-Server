import { IsDateString, IsEnum, IsNumber, IsString, Max, Min } from "class-validator";
import { WalletType } from "../../../common/enums/walletType.enum";

export class CreateTransactionDto {
	@IsEnum(WalletType, { message: 'Loại giao dịch không hợp lệ' })
	type: WalletType;

	@IsNumber()
	@Min(0, { message: 'Số tiền phải lớn hơn 0' })
	@Max(1000000000, { message: 'Số tiền phải nhỏ hơn 1 tỷ' })
	money: number;

	@IsString()
	categoriesId: string;

	@IsDateString({}, { message: 'Date phải đúng định dạng chuẩn ISO 8601 (VD: 2026-05-01T15:00:00Z)' })
	date: string;

	@IsString({ message: 'Mô tả phải là chuỗi' })
	description: string;
}