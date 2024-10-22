import { Injectable, NotFoundException } from '@nestjs/common';
import { databaseSchema } from '../database/database-schema';
import { DrizzleService } from '../database/drizzle.service';
import { eq } from 'drizzle-orm';
import { createExamDto } from 'dto/create-exam.dto';
import { upadateExamDto } from 'dto/update-exam.dto';

@Injectable()
export class ExamService {
  constructor(private readonly drizzleService: DrizzleService) {}

  getAllExams() {
    try {
      return this.drizzleService.db.select().from(databaseSchema.examen);
    } catch (error) {
      throw new Error(error);
    }
  }

  getExamById(id: number) {
    try {
      const exams = this.drizzleService.db
        .select()
        .from(databaseSchema.examen)
        .where(eq(databaseSchema.examen.id_examen, id));
      return exams;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createExam(examData: createExamDto) {
    examData.fecha_creacion = new Date();
    try {
      const createdExam = await this.drizzleService.db
        .insert(databaseSchema.examen)
        .values(examData)
        .returning();

      return createdExam.pop();
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateExam(id: number, examData: upadateExamDto) {
    examData.fecha_actualizada = new Date();
    try {
      const updatedExam = await this.drizzleService.db
        .update(databaseSchema.examen)
        .set(examData)
        .where(eq(databaseSchema.examen.id_examen, id))
        .returning();
      if (updatedExam.length === 0) {
        throw new NotFoundException();
      }
      return updatedExam.pop();
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteExam(id: number) {
    try {
      const deletedExam = await this.drizzleService.db
        .delete(databaseSchema.examen)
        .where(eq(databaseSchema.examen.id_examen, id))
        .returning();
      if (deletedExam.length === 0) {
        throw new NotFoundException();
      }
      return deletedExam.pop();
    } catch (error) {
      throw new Error(error);
    }
  }
}
