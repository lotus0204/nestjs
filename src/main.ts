import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  //앱모듈 생성
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
//시작점