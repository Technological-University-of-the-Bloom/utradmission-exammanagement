import { Module } from '@nestjs/common';
import { RespuestasController } from './respuestas.controller';
import { RespuestasService } from './respuestas.service';
import { PreguntasRespuestasService } from './preguntas-respuestas.service';

@Module({
  controllers: [RespuestasController],
  providers: [RespuestasService, PreguntasRespuestasService],
})
export class RespuestasModule {}
