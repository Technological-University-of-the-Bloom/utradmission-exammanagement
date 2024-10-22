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

  async getExamStatus(id: number) {
    try {
      const exams = await this.drizzleService.db
        .select()
        .from(databaseSchema.examen)
        .where(eq(databaseSchema.examen.id_examen, id))
        .limit(1);

      if (exams.length === 0) {
        throw new NotFoundException();
      }

      const examStatus = exams[0].is_active;
      return examStatus;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getExamDate(id: number) {
    try {
      const exams = await this.drizzleService.db
        .select()
        .from(databaseSchema.examen)
        .where(eq(databaseSchema.examen.id_examen, id));

      if (exams.length === 0) {
        throw new NotFoundException();
      }

      const examDate = exams[0].fecha_aplicar;
      return examDate;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getExamData(id: number, data: any) {
    try {
      const examData = await this.drizzleService.db
        .select()
        .from(databaseSchema.examen)
        .where(eq(databaseSchema.examen.id_examen, id));

      if (examData.length === 0) {
        throw new NotFoundException();
      }

      if (data === 'date') {
        return examData[0].fecha_aplicar;
      } else if (data === 'status') {
        return examData[0].is_active;
      } else {
        throw new NotFoundException();
      }
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
