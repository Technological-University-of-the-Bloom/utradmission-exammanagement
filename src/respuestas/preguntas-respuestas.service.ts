import { Injectable, NotFoundException } from '@nestjs/common';
import { DrizzleService } from '../database/drizzle.service';
import { databaseSchema } from '../database/database-schema';
import { eq } from 'drizzle-orm';
import { CreatePreguntasRespuestasDto } from 'dto/create-preguntas-respuestas.dto';
import { PgTableWithColumns } from 'drizzle-orm/pg-core';
import { UpdatePreguntasRespuestasDto } from 'dto/update-preguntas-respuestas.dto';

@Injectable()
export class PreguntasRespuestasService {
  constructor(private readonly drizzleService: DrizzleService) {}

  // _______________________________GET___________________________________________________________
  async getAllPreguntasRespuestas(typePR) {
    let table;

    switch (typePR) {
      case 'tecnico':
        table = databaseSchema.pt_respuestas;
        break;
      case 'vocacional':
        table = databaseSchema.pv_respuestas;
        break;
      default:
        throw new Error('Invalid typePregunta');
    }

    const preguntas = await this.drizzleService.db.select().from(table);

    if (!preguntas) {
      throw new NotFoundException();
    }
    return preguntas;
  }

  async getPreguntasRespuestasById(typePR, id: number) {
    try {
      let table;

      switch (typePR) {
        case 'tecnico':
          table = databaseSchema.pt_respuestas;
          break;
        case 'vocacional':
          table = databaseSchema.pv_respuestas;
          break;
        default:
          throw new Error('Invalid typePregunta');
      }

      const results = await this.drizzleService.db
        .select()
        .from(table)
        .where(eq(table.id_respuesta, id));

      if (!results) {
        throw new NotFoundException();
      }

      return results;
    } catch (error) {
      throw new Error(error);
    }
  }

  // _______________________________CREATE___________________________________________________________

  async createPreguntasRespuestas(
    typePR: string,
    prData: CreatePreguntasRespuestasDto,
  ): Promise<any> {
    try {
      let table: PgTableWithColumns<any>;
      switch (typePR) {
        case 'tecnico':
          table = databaseSchema.pt_respuestas;
          break;
        case 'vocacional':
          table = databaseSchema.pv_respuestas;
          break;
        default:
          throw new Error('Invalid typePregunta');
      }

      const results = await this.drizzleService.db
        .insert(table)
        .values(prData)
        .returning();
      const result = results.pop();
      if (!result) {
        throw new NotFoundException('Failed to create answer');
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  // _______________________________UPDATE___________________________________________________________

  async updatePreguntasRespuestas(
    typePR: string,
    id: number,
    prData: UpdatePreguntasRespuestasDto,
  ) {
    try {
      let table: PgTableWithColumns<any>;
      switch (typePR) {
        case 'tecnico':
          table = databaseSchema.pt_respuestas;
          break;
        case 'vocacional':
          table = databaseSchema.pv_respuestas;
          break;
        default:
          throw new Error('Invalid typePregunta');
      }

      const results = await this.drizzleService.db
        .update(table)
        .set(prData)
        .where(eq(table.id_respuesta, id))
        .returning();

      const result = results.pop();
      if (!result) {
        throw new NotFoundException();
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  // _______________________________DELETE___________________________________________________________

  async deletePreguntasRespuestas(typePR: string, id: number) {
    try {
      let table: PgTableWithColumns<any>;
      switch (typePR) {
        case 'tecnico':
          table = databaseSchema.pt_respuestas;
          break;
        case 'vocacional':
          table = databaseSchema.pv_respuestas;
          break;
        default:
          throw new Error('Invalid typePregunta');
      }

      const results = await this.drizzleService.db
        .delete(table)
        .where(eq(table.id_respuesta, id))
        .returning();
      const result = results.pop();
      if (!result) {
        throw new NotFoundException();
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
