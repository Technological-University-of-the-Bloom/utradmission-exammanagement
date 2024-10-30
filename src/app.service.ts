import { Injectable } from '@nestjs/common';
import { Exam } from './type-exam';
import { QuestionData } from './interface-questiondata';
import { PreguntasService } from './preguntas/preguntas.service';
import { RespuestasService } from './respuestas/respuestas.service';
import { CarreraPService } from './preguntas/carrera_p.service';
import { PreguntasRespuestasService } from './respuestas/preguntas-respuestas.service';
@Injectable()
export class AppService {
  constructor(
    private readonly preguntasService: PreguntasService,
    private readonly respuestasService: RespuestasService,
    private readonly carreraPService: CarreraPService,
    private readonly preguntasRespuestasService: PreguntasRespuestasService,
  ) {}

  /**
   * Builds an exam based on the specified type and career ID.
   * @param examType - Type of exam, either 'tecnico' or 'vocacional'.
   * @param carreraID - ID of the career for which to fetch relevant questions.
   * @returns A structured exam object containing questions, answers, and metadata.
   */

  async buildExam(examType: 'tecnico' | 'vocacional', carreraID: number) {
    // Initialize arrays to hold question and answer data
    const questions: QuestionData[] = [];
    const answerData: any[][] = []; // Array to store answer details for each question
    const answersPerQuestion: any[] = []; // Array to map answers to each question
    const getQuestionData: any[] = []; // Array to store fetched question data

    // Fetch questions related to the specified career and exam type
    const questionsPerCarrera =
      await this.carreraPService.getCarreraPreguntaById(examType, carreraID);

    // Loop through each question to retrieve detailed data and associated answers
    for (let i = 0; i <= questionsPerCarrera.length - 1; i++) {
      getQuestionData[i] = await this.preguntasService.getPreguntasById(
        examType,
        questionsPerCarrera[i].id_pregunta,
      );

      // Fetch answer mappings for each question
      answersPerQuestion[i] =
        await this.preguntasRespuestasService.getPreguntasRespuestasById(
          examType,
          questionsPerCarrera[i].id_pregunta,
        );
    }

    for (let i = 0; i <= answersPerQuestion.length - 1; i++) {
      answerData[i] = [];
      for (let j = 0; j <= answersPerQuestion[i].length - 1; j++) {
        const answer = await this.respuestasService.getAllRespuestasById(
          examType,
          answersPerQuestion[i][j].id_respuesta,
        );
        answerData[i].push(...answer);
      }
    }
    //const answers: answers = [{}];
    for (let i = 0; i <= getQuestionData.length - 1; i++) {
      questions[i] = {
        id_pregunta: getQuestionData[i].id_pregunta || 'null',
        imagen: getQuestionData[i].imagen || 'null',
        descripcion: getQuestionData[i].descripcion || 'null',
        answers: answerData[i] || 'null',
      } as QuestionData;
    }

    // Create and return the exam object needs more work.
    const exam: Exam = {
      id_examen: 1, // You may want to replace this with a valid ID
      exam_type: examType,
      fecha_aplicar: new Date().toISOString(), // Or use the actual apply date if available
      version_examen: 1, // Adjust if there’s a specific versioning logic
      tiempo_limite: 60, // Default time limit; adjust as needed
      carreraID,
      //remove questions data and replace with just questions
      questionData: questions as QuestionData[], // Initialize as an empty array to populate with questions
      updatedAt: new Date(),
      createdAt: new Date(),
      status: true,
    };
    return exam;
  }
}
