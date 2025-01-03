import { Injectable, NotFoundException } from '@nestjs/common';
import { databaseSchema } from 'src/database/database-schema';
import { DrizzleService } from 'src/database/drizzle.service';
import { eq } from 'drizzle-orm';
import { UpdatePreguntaDto } from 'dto/update-pregunta.dto';
import { CreatePreguntaDto } from 'dto/create-pregunta.dto';
import { CarreraPService } from './carrera_p.service';
import { PgTableWithColumns } from 'drizzle-orm/pg-core';
import { CreateCarreraPDto } from 'dto/create-carrerap.dto';

@Injectable()
export class PreguntasService {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly carreraPService: CarreraPService,
  ) {}

  //____________________________________GET___________________________________________

  async getAllPreguntas(typePregunta: any) {
    try {
      let table;
      switch (typePregunta) {
        case 'tecnico':
          table = databaseSchema.preguntas_tecnico;
          break;
        case 'vocacional':
          table = databaseSchema.preguntas_vocacional;
          break;
        default:
          throw new Error('Invalid question type');
      }
      return await this.drizzleService.db.select().from(table);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getPreguntasById(preguntaType: string, id: number) {
    try {
      let table;
      switch (preguntaType) {
        case 'tecnico':
          table = databaseSchema.preguntas_tecnico;
          break;
        case 'vocacional':
          table = databaseSchema.preguntas_vocacional;
          break;
        default:
          throw new Error('Invalid question type');
      }
      const preguntas = await this.drizzleService.db
        .select()
        .from(table)
        .where(eq(table.id_pregunta, id));

      const pregunta = (preguntas as any[]).pop();

      if (!pregunta) {
        throw new NotFoundException();
      }
      return pregunta;
    } catch (error) {
      throw new Error(error);
    }
  }

  //___________________________________CREATE___________________________________________

  async createPreguntas(typePregunta: string, preguntaData: CreatePreguntaDto) {
    try {
      let table: PgTableWithColumns<any>;
      let carreraPData: CreateCarreraPDto;

      if (preguntaData.id_carrera) {
        carreraPData = {
          id_pregunta: 0,
          id_carrera: preguntaData.id_carrera,
        };
      }

      switch (typePregunta) {
        case 'tecnico':
          table = databaseSchema.preguntas_tecnico;
          break;
        case 'vocacional':
          table = databaseSchema.preguntas_vocacional;
          break;
        default:
          throw new Error('Invalid type of question');
      }
      preguntaData.id_carrera = null;
      const preguntas = await this.drizzleService.db
        .insert(table)
        .values(preguntaData)
        .returning();
      const pregunta = (preguntas as any[]).pop();
      if (!pregunta) {
        throw new NotFoundException('Failed to create question');
      }

      if (carreraPData) {
        carreraPData.id_pregunta = pregunta.id_pregunta;
        await this.carreraPService.createCarreraP(typePregunta, carreraPData);
      }

      return pregunta;
    } catch (error) {
      throw error;
    }
  }
  //___________________________________UPDATE___________________________________________

  async updatePregunta(
    typePregunta: string,
    id: number,
    preguntaData: UpdatePreguntaDto,
  ) {
    try {
      let table;
      switch (typePregunta) {
        case 'tecnico':
          table = databaseSchema.preguntas_tecnico;
          break;
        case 'vocacional':
          table = databaseSchema.preguntas_vocacional;
          break;
        default:
          throw new Error('Invalid type of question');
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

  //___________________________________DELETE___________________________________________

  async deletePregunta(typePregunta: string, id: number) {
    try {
      let table;
      switch (typePregunta) {
        case 'tecnico':
          table = databaseSchema.preguntas_tecnico;
          break;
        case 'vocacional':
          table = databaseSchema.preguntas_vocacional;
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
      return pregunta;
    } catch (error) {
      throw new Error(error);
    }
  }
}
