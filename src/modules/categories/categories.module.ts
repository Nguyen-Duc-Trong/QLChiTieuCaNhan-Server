import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesEntity } from './entities/categories.entity';

@Module({
	imports: [TypeOrmModule.forFeature([CategoriesEntity])],
	controllers: [],
	providers: [],
	exports: [TypeOrmModule],
})
export class CategoriesModule { }
