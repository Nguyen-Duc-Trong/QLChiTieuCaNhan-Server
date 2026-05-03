import 'reflect-metadata';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import session from 'express-session';
import morgan from 'morgan';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(morgan('dev'));
	const { httpAdapter } = app.get(HttpAdapterHost);
	app.useGlobalFilters(new AllExceptionsFilter({ httpAdapter } as any));

	app.use(
		session({
			secret: process.env.SESSION_SECRET || 'secret',
			resave: false,
			saveUninitialized: false,
			cookie: {
				maxAge: 3600000, // 1 hour
			},
		}),
	);

	app.useGlobalPipes(new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true,
		transform: true,
		exceptionFactory: (errors) => {
			const getFirstError = (errs: any[]): string => {
				if (errs[0].constraints) {
					return Object.values(errs[0].constraints)[0] as string;
				}
				if (errs[0].children && errs[0].children.length > 0) {
					return getFirstError(errs[0].children);
				}
				return 'Dữ liệu không hợp lệ';
			};
			return new BadRequestException(getFirstError(errors));
		}
	}));

	app.setGlobalPrefix('api/wallet')

	await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
	console.log(`Server đang chạy tại: http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();
