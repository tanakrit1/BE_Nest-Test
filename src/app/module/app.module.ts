import { Module } from '@nestjs/common';
import { AppController } from '../../app.controller';
import { AppService } from '../../app.service';
import { UserModule } from './user.module';
import { DatabaseModule } from './database.module';
import { DepartmentModule } from './department.module';

@Module({
  imports: [DatabaseModule ,UserModule, DepartmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
