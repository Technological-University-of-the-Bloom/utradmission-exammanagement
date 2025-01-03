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
import { ExamService } from './exam.service';
import { createExamDto } from 'dto/create-exam.dto';
import { upadateExamDto } from 'dto/update-exam.dto';

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

  @Get('status/:id')
  getExamStatus(@Param('id', ParseIntPipe) id: number) {
    return this.examService.getExamStatus(id);
  }

  @Get('date/:id')
  getExamDate(@Param('id', ParseIntPipe) id: number) {
    return this.examService.getExamDate(id);
  }

  @Get('data/:id/:data')
  getExamData(@Param('id', ParseIntPipe) id: number, @Param('data') data: any) {
    return this.examService.getExamData(id, data);
  }

  @Post('create')
  createExam(@Body() examData: createExamDto) {
    return this.examService.createExam(examData);
  }

  @Patch(':id')
  updateExam(
    @Param('id', ParseIntPipe) id: number,
    @Body() examData: upadateExamDto,
  ) {
    return this.examService.updateExam(id, examData);
  }

  @Delete(':id')
  deleteExam(@Param('id', ParseIntPipe) id: number) {
    return this.examService.deleteExam(id);
  }
}
