import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConverterModule } from './converter/converter.module';

async function bootstrap() {
  const app = await NestFactory.create(ConverterModule);

  const config = new DocumentBuilder()
    .setTitle('CC Converter')
    .setDescription('API Docs')
    .setVersion('1.0.1')
    .addTag('cryptoconvert')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
