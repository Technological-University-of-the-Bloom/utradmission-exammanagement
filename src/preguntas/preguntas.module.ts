import { Module } from '@nestjs/common';
import { PreguntasController } from './preguntas.controller';
import { PreguntasService } from './preguntas.service';
import { CarreraPService } from './carrera_p.service';

@Module({
  controllers: [PreguntasController],
  providers: [PreguntasService, CarreraPService],
})
export class PreguntasModule {}
