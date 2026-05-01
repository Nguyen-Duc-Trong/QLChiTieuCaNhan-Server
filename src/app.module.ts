import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		JwtModule.registerAsync({
			global: true,
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET'),
				signOptions: { expiresIn: '1h' },
			}),
			inject: [ConfigService],
		}),
		DatabaseModule,
		AuthModule,
		UserModule,
		TransactionsModule,
		CategoriesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
