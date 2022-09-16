import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
   const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('pug');

  if (process.env.PORT){
    await app.listen(process.env.PORT);
  } else {
    await app.listen(3000);
  }
  
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
