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
import { RespuestasService } from './respuestas.service';
import { CreateRespuestaDto } from 'dto/create-respuesta.dto';
import { UpdateRespuestaDto } from 'dto/update-respuesta.dto';

@Controller('respuestas')
export class RespuestasController {
  constructor(private readonly respuestasService: RespuestasService) {}

  //_____________________________GET___________________________________________________________
  @Get(':type')
  getAllRespuestas(@Param('type') type: string) {
    return this.respuestasService.getAllRespuestas(type);
  }

  @Get(':type/:id')
  getRespuestasById(
    @Param('type') type: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.respuestasService.getAllRespuestasById(type, id);
  }

  //_____________________________POST___________________________________________________________
  @Post('create/:type')
  createRespuesta(
    @Param('type') type: string,
    @Body() respuestaData: CreateRespuestaDto,
  ) {
    return this.respuestasService.createRespuesta(type, respuestaData);
  }

  //_____________________________PATCH___________________________________________________________
  @Patch('update/:type/:id')
  updateRespuesta(
    @Param('type') type: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() respuestaData: UpdateRespuestaDto,
  ) {
    return this.respuestasService.updateRespuesta(type, id, respuestaData);
  }

  //_____________________________DELETE___________________________________________________________
  @Delete('delete/:type/:id')
  deleteRespuesta(
    @Param('type') type: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.respuestasService.deleteRespuesta(type, id);
  }
}
