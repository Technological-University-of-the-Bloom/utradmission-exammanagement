import { answers } from './type-exam';

export interface QuestionData {
  id_pregunta?: number;
  imagen?: string;
  descripcion?: string;
  answers?: answers;
}
