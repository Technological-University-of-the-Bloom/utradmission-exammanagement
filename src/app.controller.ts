import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Exam as exam } from './type-exam';
import { BuildExam } from './exam.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/build-exam')
  buildExam(@Body() examData: BuildExam): Promise<exam> {
    return this.appService.buildExam(examData.examType, examData.carreraID);
  }
}
