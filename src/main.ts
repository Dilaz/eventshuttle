import { RequestMethod, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Add api versioning support
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Add helmet for security
  app.use(helmet({
    // Content security is not required for an API and it might mess with swagger
    contentSecurityPolicy: false,
  }));


  // Add global prefix and exclude healthcheck & documentation
  app.setGlobalPrefix('api', {
    exclude: [
      { path: 'health', method: RequestMethod.GET },
      { path: 'docs', method: RequestMethod.GET },
    ],
  });

  // Swagger documentation if not in production
  if (configService.get<string>('env') !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('EventShuttle')
      .setDescription('The EventShuttle API description')
      .setVersion('1.0')
      .addTag('eventshuttle')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    enableDebugMessages: configService.get<string>('env') === 'development',
  }));

  // Use the port from env, default to 3000
  await app.listen(configService.get<number>('port'));
}
bootstrap();
