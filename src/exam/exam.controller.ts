import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ExamService } from './exam.service';
import { createExamDto } from 'dto/create-exam.dto';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Get()
  getAllExams() {
    return this.examService.getAllExams();
  }

  @Get(':id')
  getExamById(@Param('id', ParseIntPipe) id: number) {
    return this.examService.getExamById(id);
  }

  @Post('create')
  createExam(@Body() examData: createExamDto) {
    return this.examService.createExam(examData);
  }
}
