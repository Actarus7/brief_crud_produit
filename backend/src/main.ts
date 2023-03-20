import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { corsConfig } from './constants/cors-config';
import { HttpExceptionFilter } from './errors/AllExceptionsFilter';

async function bootstrap() {

  ConfigModule.forRoot();
  const port = process.env.PORT || 3000;


  const app = await NestFactory.create(AppModule);
  app.use(helmet())
    .setGlobalPrefix('api/') // ajoute un préfixe "api" à toutes les routes (http://localhost:3000/api)
    .useGlobalPipes(new ValidationPipe()) // permet la prise en charge globale des Dto (toutes les routes utilisent des Dto s'ils existent)
    .useGlobalFilters(new HttpExceptionFilter()) // permet de gérer les erreurs de manières globales en utilisant un formalisme identique - créé dans le dossier "errors"
    .enableCors(corsConfig);



  const config = new DocumentBuilder()
    .setTitle('Crud_Produit')
    .setDescription('The Crud_Produit API description')
    .setVersion('1.0')
    .addTag('Crud_Produit')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);



  await app.listen(port);
  console.log('Server started at http://localhost:' + port);
}
bootstrap();
