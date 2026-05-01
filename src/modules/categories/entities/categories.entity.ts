import { WalletType } from "src/common/enums/walletType.enum";
import { TransactionsEntity } from "src/modules/transactions/entities/transactions.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity('categories')
export class CategoriesEntity {
	@PrimaryColumn('uuid', { name: 'id', default: () => 'gen_random_uuid()' })
	id: string;
	@Column({
		name: "name",
		type: "varchar",
		length: 255,
		nullable: false,
	})
	name: string;

	@Column({
		name: "type",
		type: "enum",
		enum: WalletType,
		nullable: true,
	})
	type: WalletType;

	@OneToMany(() => TransactionsEntity, (transactions) => transactions.categories)
	transactions: TransactionsEntity[];
}