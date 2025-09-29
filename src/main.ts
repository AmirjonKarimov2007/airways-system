import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const logger = app.get<Logger>(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  const apiPrefix = 'api';
  app.setGlobalPrefix(apiPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Airways System API')
    .setDescription('Airline booking platform API (No Redis)')
    .setVersion('1.1')
    .addBearerAuth()
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${apiPrefix}/docs`, app, doc);

  const httpAdapter = app.getHttpAdapter();
  httpAdapter.get('/', (_req: any, res: any) => res.redirect(`/${apiPrefix}/docs`));

  const port = Number(process.env.APP_PORT) || 3000;
  await app.listen(port);
  const url = await app.getUrl();
  const normalized = url.replace(/\/$/, '').replace('://[::1]', '://localhost');
  // eslint-disable-next-line no-console
  console.log(`HTTP server listening on ${normalized}/${apiPrefix}`);
  // eslint-disable-next-line no-console
  console.log(`Swagger docs ready at ${normalized}/${apiPrefix}/docs`);
}
bootstrap();
