import { QuestionData } from './interface-questiondata';
export type Exam = {
  id_examen: number;
  exam_type: 'vocacional' | 'tecnico';
  fecha_aplicar: string;
  version_examen: number;
  tiempo_limite: number;
  carreraID: number;
  questionData: QuestionData[];
  updatedAt: Date;
  createdAt: Date;
  status: boolean;
};

export type questions = [
  {
    id_pregunta?: number;
    imagen?: string;
    descripcion?: string;
    answers?: answers;
  },
];

export type answers = {
  id_respuesta?: number;
  imagen?: string;
  opcion_a?: string;
  opcion_b?: string;
  opcion_c?: string;
  opcion_d?: string;
  opcion_e?: string;
  opcion_correcta?: string;
};
