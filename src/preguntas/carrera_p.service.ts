import { Injectable, NotFoundException } from '@nestjs/common';
import { databaseSchema } from 'src/database/database-schema';
import { DrizzleService } from 'src/database/drizzle.service';
import { eq } from 'drizzle-orm';
import { PgTableWithColumns } from 'drizzle-orm/pg-core';
import { CreateCarreraPDto } from 'dto/create-carrerap.dto';
import { UpdateCarreraPDto } from 'dto/update_carrerap.dto';

@Injectable()
export class CarreraPService {
  constructor(private readonly drizzleService: DrizzleService) {}

  // _______________________________GET___________________________________________________________
  async getAllCarreraPeguntas(typePregunta: string) {
    try {
      let table;
      switch (typePregunta) {
        case 'tecnico':
          table = databaseSchema.carrera_pt;
          break;
        case 'vocacional':
          table = databaseSchema.carrera_pv;
          break;
        default:
          throw new Error('Invalid typePregunta');
      }
      return await this.drizzleService.db.select().from(table);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCarreraPreguntaById(typePregunta: string, id: number) {
    try {
      let table: PgTableWithColumns<any>;
      switch (typePregunta) {
        case 'tecnico':
          table = databaseSchema.carrera_pt;
          break;
        case 'vocacional':
          table = databaseSchema.carrera_pv;
          break;
        default:
          throw new Error('Invalid typePregunta');
      }
      const preguntas = await this.drizzleService.db
        .select()
        .from(table)
        .where(eq(table.id_carrera, id));

      if (!preguntas) {
        throw new NotFoundException();
      }
      return preguntas;
    } catch (error) {
      throw new Error(error);
    }
  }

  // _______________________________CREATE___________________________________________________________

  async createCarreraP(typePregunta: string, preguntaData: CreateCarreraPDto) {
    try {
      let table: PgTableWithColumns<any>;
      switch (typePregunta) {
        case 'tecnico':
          table = databaseSchema.carrera_pt;
          break;
        case 'vocacional':
          table = databaseSchema.carrera_pv;
          break;
        default:
          throw new Error('Invalid typePregunta');
      }

      const preguntas = await this.drizzleService.db
        .insert(table)
        .values(preguntaData)
        .returning();
      const pregunta = (preguntas as any[]).pop();
      if (!pregunta) {
        throw new NotFoundException();
      }
      return pregunta;
    } catch (error) {
      throw new Error(error);
    }
  }

  // _______________________________UPDATE___________________________________________________________

  async updateCarreraP(
    typePregunta: string,
    id: number,
    preguntaData: UpdateCarreraPDto,
  ) {
    try {
      let table: PgTableWithColumns<any>;
      switch (typePregunta) {
        case 'tecnico':
          table = databaseSchema.carrera_pt;
          break;
        case 'vocacional':
          table = databaseSchema.carrera_pv;
          break;
        default:
          throw new Error('Invalid typePregunta');
      }

      const updatedPregunta = await this.drizzleService.db
        .update(table)
        .set(preguntaData)
        .where(eq(table.id_pregunta, id))
        .returning();
      const pregunta = (updatedPregunta as any[]).pop();

      if (!pregunta) {
        throw new NotFoundException();
      }

      return pregunta;
    } catch (error) {
      throw new Error(error);
    }
  }

  // _______________________________DELETE___________________________________________________________

  async deleteCarreraP(typePregunta: string, id: number) {
    try {
      let table: PgTableWithColumns<any>;
      switch (typePregunta) {
        case 'tecnico':
          table = databaseSchema.carrera_pt;
          break;
        case 'vocacional':
          table = databaseSchema.carrera_pv;
          break;
        default:
          throw new Error('Invalid typePregunta');
      }

      const deletedPregunta = await this.drizzleService.db
        .delete(table)
        .where(eq(table.id_pregunta, id))
        .returning();
      const pregunta = (deletedPregunta as any[]).pop();
      if (!pregunta) {
        throw new NotFoundException();
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
