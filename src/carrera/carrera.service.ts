import { Injectable, NotFoundException } from '@nestjs/common';
import { DrizzleService } from '../database/drizzle.service';
import { databaseSchema } from 'src/database/database-schema';
import { eq } from 'drizzle-orm';
import { CreateCarreraDto } from 'dto/create-carrera.dto';
import { updateCarreraDto } from 'dto/update-carrera.dto';

@Injectable()
export class CarreraService {
  constructor(private readonly drizzleService: DrizzleService) {}

  //_______________________________GET___________________________________________________________
  async getAllCarreras() {
    try {
      return await this.drizzleService.db.select().from(databaseSchema.carrera);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCarreraById(id: number) {
    try {
      const carreras = await this.drizzleService.db
        .select()
        .from(databaseSchema.carrera)
        .where(eq(databaseSchema.carrera.id_carrera, id));
      const carrera = carreras.pop();
      if (!carrera) {
        throw new NotFoundException();
      }
      return carrera;
    } catch (error) {
      throw new Error(error);
    }
  }

  //_______________________________CREATE___________________________________________________________
  async createCarrera(carreraData: CreateCarreraDto) {
    try {
      const createdCarrera = await this.drizzleService.db
        .insert(databaseSchema.carrera)
        .values(carreraData)
        .returning();
      const carrera = createdCarrera.pop();

      if (!carrera) {
        console.log('here');
        throw new NotFoundException();
      }

      return carrera;
    } catch (error) {
      console.log('here 2');
      throw new Error(error);
    }
  }

  //_______________________________UPDATE___________________________________________________________
  async updateCarrera(id: number, carreraData: updateCarreraDto) {
    try {
      const updatedCarrera = await this.drizzleService.db
        .update(databaseSchema.carrera)
        .set(carreraData)
        .where(eq(databaseSchema.carrera.id_carrera, id))
        .returning();
      const carrera = updatedCarrera.pop();
      if (!carrera) {
        throw new NotFoundException();
      }
      return carrera;
    } catch (error) {
      throw new Error(error);
    }
  }

  //_______________________________DELETE___________________________________________________________
  async deleteCarrera(id: number) {
    try {
      const deletedCarrera = await this.drizzleService.db
        .delete(databaseSchema.carrera)
        .where(eq(databaseSchema.carrera.id_carrera, id))
        .returning();

      const carrera = deletedCarrera.pop();
      if (!carrera) {
        throw new NotFoundException();
      }
      return carrera;
    } catch (error) {
      throw new Error(error);
    }
  }
}
