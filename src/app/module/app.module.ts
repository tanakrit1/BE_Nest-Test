import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from '../../app.controller';
import { AppService } from '../../app.service';
import { UserModule } from './user.module';
import { DatabaseModule } from './database.module';
import { DepartmentModule } from './department.module';
import { AuthModule } from './auth.module';
import { JwtAuthMiddleware } from '../middleware/jwt.middleware';

@Module({
  imports: [DatabaseModule ,UserModule, DepartmentModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(JwtAuthMiddleware)
            .exclude(
                { path: '/', method: RequestMethod.GET }, 
                { path: '/auth/sign-in', method: RequestMethod.POST },
            )
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
