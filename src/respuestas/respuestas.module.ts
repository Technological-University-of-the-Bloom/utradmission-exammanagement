import { Module } from '@nestjs/common';
import { RespuestasController } from './respuestas.controller';
import { RespuestasService } from './respuestas.service';

@Module({
  controllers: [RespuestasController],
  providers: [RespuestasService]
})
export class RespuestasModule {}
