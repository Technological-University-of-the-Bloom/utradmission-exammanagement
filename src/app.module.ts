import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExamModule } from './exam/exam.module';
import { DatabaseModule } from './database/database.module';
import { CarreraModule } from './carrera/carrera.module';
import { PreguntasModule } from './preguntas/preguntas.module';
import { RespuestasModule } from './respuestas/respuestas.module';
import * as Joi from 'joi';
import { ExamService } from './exam/exam.service';
import { CarreraService } from './carrera/carrera.service';
import { PreguntasService } from './preguntas/preguntas.service';
import { RespuestasService } from './respuestas/respuestas.service';
import { CarreraPService } from './preguntas/carrera_p.service';
import { PreguntasRespuestasService } from './respuestas/preguntas-respuestas.service';

@Module({
  imports: [
    DatabaseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        user: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
      }),
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
      }),
    }),
    ExamModule,
    CarreraModule,
    PreguntasModule,
    RespuestasModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ExamService,
    CarreraService,
    PreguntasService,
    RespuestasService,
    CarreraPService,
    PreguntasRespuestasService,
  ],
})
export class AppModule {}
