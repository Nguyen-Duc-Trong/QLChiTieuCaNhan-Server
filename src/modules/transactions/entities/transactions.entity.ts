import { WalletType } from "../../../common/enums/walletType.enum";
import { CategoriesEntity } from "../../categories/entities/categories.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('transactions')
export class TransactionsEntity {
	@PrimaryColumn('uuid', { name: 'id', default: () => 'gen_random_uuid()' })
	id: string;

	@Column({
		name: "user_id",
		type: "uuid",
		nullable: false,
	})
	userId: string;
	@Column({
		name: "money",
		type: "decimal",
		precision: 10,
		nullable: false,
	})
	money: number;
	@Column({
		name: "type",
		type: "enum",
		enum: WalletType,
		nullable: true,
	})
	type: WalletType;
	@Column({
		name: "categories_id",
		type: "uuid",
		nullable: false,
	})
	categoriesId: string;
	@Column({
		name: "description",
		type: "varchar",
		nullable: false,
	})
	description: string;
	@Column({
		name: "date",
		type: "timestamp",
		nullable: false,
	})
	date: Date;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@ManyToOne(() => CategoriesEntity, (categories) => categories.transactions)
	@JoinColumn({ name: 'categories_id' })
	categories: CategoriesEntity;
}
