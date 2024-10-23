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
import { CarreraService } from './carrera.service';
import { CreateCarreraDto } from 'dto/create-carrera.dto';
import { updateCarreraDto } from 'dto/update-carrera.dto';

@Controller('carrera')
export class CarreraController {
  constructor(private readonly carreraService: CarreraService) {}

  @Get()
  getAllCarreras() {
    return this.carreraService.getAllCarreras();
  }

  @Get(':id')
  getCarreraById(@Param('id', ParseIntPipe) id: number) {
    return this.carreraService.getCarreraById(id);
  }

  @Post('create')
  createCarrera(@Body() carreraData: CreateCarreraDto) {
    return this.carreraService.createCarrera(carreraData);
  }

  @Patch(':id')
  updateCarrera(
    @Param('id', ParseIntPipe) id: number,
    @Body() carreraData: updateCarreraDto,
  ) {
    return this.carreraService.updateCarrera(id, carreraData);
  }

  @Delete(':id')
  deleteCarrera(@Param('id', ParseIntPipe) id: number) {
    return this.carreraService.deleteCarrera(id);
  }
}
