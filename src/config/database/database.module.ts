import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        
        return {
          type: 'postgres',
          ...(databaseUrl 
            ? { url: databaseUrl } 
            : {
                host: configService.get<string>('DB_HOST', 'db'),
                port: configService.get<number>('DB_PORT', 5432),
                username: configService.get<string>('DB_USERNAME', 'postgres'),
                password: configService.get<string>('DB_PASSWORD', 'postgres'),
                database: configService.get<string>('DB_DATABASE', 'finance_db'),
              }),
          autoLoadEntities: true,
          synchronize: false,
          logging: true,
          // Fly.io Postgres thường yêu cầu SSL nếu kết nối từ bên ngoài, 
          // nhưng nếu dùng internal thì không cần. Thêm vào cho chắc chắn.
          ssl: databaseUrl ? { rejectUnauthorized: false } : false,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}