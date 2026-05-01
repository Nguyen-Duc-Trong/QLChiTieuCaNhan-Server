import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('users')
export class UserEntity {
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
		name: "email",
		type: "varchar",
		length: 255,
		nullable: false,
		unique: true //Là duy nhất
	})
	email: string;

	@Column({
		name: "password",
		type: "varchar",
		nullable: false,
	})
	password: string;
}