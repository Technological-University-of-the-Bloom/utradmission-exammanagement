import { Injectable } from '@nestjs/common';
import { databaseSchema } from '../database/database-schema';
import { DrizzleService } from '../database/drizzle.service';
import { eq } from 'drizzle-orm';
import { createExamDto } from 'dto/create-exam.dto';

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
}
