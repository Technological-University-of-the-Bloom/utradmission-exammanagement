import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PreguntasService } from './preguntas.service';
import { UpdatePreguntaDto } from 'dto/update-pregunta.dto';
import { CreatePreguntaDto } from 'dto/create-pregunta.dto';

@Controller('preguntas')
export class PreguntasController {
  constructor(private readonly preguntasService: PreguntasService) {}

  //___________________________________GET_________________________________________________________
  @Get(':type')
  getAllPreguntas(@Param('type') type: string) {
    return this.preguntasService.getAllPreguntas(type);
  }

  @Get(':type/:id')
  getPreguntasById(
    @Param('type') type: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.getPreguntasById(type, id);
  }

  //___________________________________POST________________________________________________________
  @Post('create/:type')
  createPreguntas(
    @Param('type') type: string,
    @Body() preguntaData: CreatePreguntaDto,
  ) {
    return this.preguntasService.createPreguntas(type, preguntaData);
  }

  //___________________________________PATCH________________________________________________________
  @Patch('update/:type/:id')
  updatePregunta(
    @Param('type') type: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() preguntaData: UpdatePreguntaDto,
  ) {
    return this.preguntasService.updatePregunta(type, id, preguntaData);
  }

  //___________________________________DELETE________________________________________________________
  @Delete('delete/:type/:id')
  deletePreguntas(
    @Param('type') type: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.preguntasService.deletePregunta(type, id);
  }
}
