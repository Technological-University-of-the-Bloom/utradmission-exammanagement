import { Injectable, NotFoundException } from '@nestjs/common';
import { databaseSchema } from 'src/database/database-schema';
import { DrizzleService } from 'src/database/drizzle.service';
import { eq } from 'drizzle-orm';
import { PgTableWithColumns } from 'drizzle-orm/pg-core';
import { CreateRespuestaDto } from 'dto/create-respuesta.dto';
import { UpdateRespuestaDto } from 'dto/update-respuesta.dto';
import { CreatePreguntasRespuestasDto } from 'dto/create-preguntas-respuestas.dto';
import { PreguntasRespuestasService } from './preguntas-respuestas.service';

@Injectable()
export class RespuestasService {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly preguntasRespuestasService: PreguntasRespuestasService,
  ) {}

  // _______________________________GET___________________________________________________________
  async getAllRespuestas(typeAnswer: string) {
    let table;

    switch (typeAnswer) {
      case 'tecnico':
        table = databaseSchema.respuestas_tecnico;
        break;
      case 'vocacional':
        table = databaseSchema.respuestas_vocacional;
        break;
      default:
        throw new Error('Invalid typePregunta');
    }

    const respuestas = await this.drizzleService.db.select().from(table);

    if (!respuestas) {
      throw new NotFoundException('Answer not found');
    }
    return respuestas;
  }

  async getAllRespuestasById(typeAnswer: string, id: number) {
    let table: PgTableWithColumns<any>;

    switch (typeAnswer) {
      case 'tecnico':
        table = databaseSchema.respuestas_tecnico;
        break;
      case 'vocacional':
        table = databaseSchema.respuestas_vocacional;
        break;
      default:
        throw new Error('Invalid answer type');
    }

    const respuestas = await this.drizzleService.db
      .select()
      .from(table)
      .where(eq(table.id_respuesta, id));

    if (!respuestas) {
      throw new NotFoundException('Answer not found');
    }
    return respuestas;
  }

  // _______________________________CREATE___________________________________________________________

  async createRespuesta(
    typeAnswer: string,
    respuestaData: CreateRespuestaDto,
  ): Promise<any> {
    let table: PgTableWithColumns<any>;
    let prData: CreatePreguntasRespuestasDto;
    if (!respuestaData.id_pregunta) {
      throw new NotFoundException('No question ID provided');
    }
    if (respuestaData.id_pregunta) {
      prData = {
        id_respuesta: 0,
        id_pregunta: respuestaData.id_pregunta,
      };
    }

    switch (typeAnswer) {
      case 'tecnico':
        table = databaseSchema.respuestas_tecnico;
        break;
      case 'vocacional':
        table = databaseSchema.respuestas_vocacional;
        break;
      default:
        throw new Error('Invalid answer type');
    }
    respuestaData.id_pregunta = null;
    const respuestas = await this.drizzleService.db
      .insert(table)
      .values(respuestaData)
      .returning();
    const respuesta = respuestas.pop();
    if (!respuesta) {
      throw new NotFoundException('Failed to create answer');
    }

    if (prData) {
      prData.id_respuesta = respuesta.id_respuesta;
      await this.preguntasRespuestasService.createPreguntasRespuestas(
        typeAnswer,
        prData,
      );
    }
    return respuesta;
  }

  // _______________________________UPDATE___________________________________________________________

  async updateRespuesta(
    typeAnswer: string,
    id: number,
    respuestaData: UpdateRespuestaDto,
  ) {
    try {
      let table: PgTableWithColumns<any>;
      switch (typeAnswer) {
        case 'tecnico':
          table = databaseSchema.respuestas_tecnico;
          break;
        case 'vocacional':
          table = databaseSchema.respuestas_vocacional;
          break;
        default:
          throw new Error('Invalid answer type');
      }

      const updatedRespuesta = await this.drizzleService.db
        .update(table)
        .set(respuestaData)
        .where(eq(table.id_respuesta, id))
        .returning();
      const respuesta = (updatedRespuesta as any[]).pop();

      if (!respuesta) {
        throw new NotFoundException();
      }
      return respuesta;
    } catch (error) {
      throw new Error(error);
    }
  }

  // _______________________________DELETE___________________________________________________________

  async deleteRespuesta(typeAnswer: string, id: number) {
    try {
      let table: PgTableWithColumns<any>;
      switch (typeAnswer) {
        case 'tecnico':
          table = databaseSchema.respuestas_tecnico;
          break;
        case 'vocacional':
          table = databaseSchema.respuestas_vocacional;
          break;
        default:
          throw new Error('Invalid answer type');
      }

      const deletedRespuesta = await this.drizzleService.db
        .delete(table)
        .where(eq(table.id_respuesta, id))
        .returning();
      const respuesta = (deletedRespuesta as any[]).pop();
      if (!respuesta) {
        throw new NotFoundException();
      }
      return respuesta;
    } catch (error) {
      throw new Error(error);
    }
  }
}
