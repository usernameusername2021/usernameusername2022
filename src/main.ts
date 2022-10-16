import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as passport from 'passport';
import * as session from 'express-session';
import { join } from 'path';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
   const app = await NestFactory.create<NestExpressApplication>(
    AppModule, 
  );

  const config = new DocumentBuilder()
    .setTitle('usernameusername2022')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('user')
    .addTag('songs')
    .addBasicAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const passport = require('passport');
  const LocalStrategy = require('passport-local').Strategy;
  app.use(session({
      secret: "asdasfdj091883123kasld123asd",
      resave: false,
      saveUninitialized: false,
      cookie: {maxAge: 360000}
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());


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
