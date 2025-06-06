import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:5173'
    }
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));
  app.enableCors()
  const port = process.env.PORT ?? 3000;
  await app.listen(port, () => {
    console.log(`Application running on port ${port}`);
  });
}
bootstrap();
