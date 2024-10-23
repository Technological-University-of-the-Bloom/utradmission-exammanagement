import { carrera } from './tables/database-table-carrera';
import { carrera_pt } from './tables/database-table-carrera_pt';
import { examen } from './tables/database-table-exam';
import { preguntas_tecnico } from './tables/database-table-preguntas_tecnico';
import { pt_respuestas } from './tables/database-table-pt_respuestas';
import { respuestas_tecnico } from './tables/database-table-respuestas_tecnico';

export const databaseSchema = {
  examen,
  carrera,
  carrera_pt,
  preguntas_tecnico,
  respuestas_tecnico,
  pt_respuestas,
};
