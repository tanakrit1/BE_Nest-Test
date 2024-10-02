import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/module/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('BE_Nest-Test')
  .setDescription('test')
  .setVersion('1.0')
  .addTag('BE_Nest-Test')
  .build();

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.useGlobalPipes(new ValidationPipe())
  app.enableCors() 
  await app.listen(process.env.APP_PORT);
}
bootstrap();
