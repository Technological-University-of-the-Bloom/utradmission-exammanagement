import { carrera } from './tables/database-table-carrera';
import { carrera_pt } from './tables/database-table-carrera_pt';
import { carrera_pv } from './tables/database-table-carrera_pv';
import { examen } from './tables/database-table-exam';
import { preguntas_tecnico } from './tables/database-table-preguntas_tecnico';
import { preguntas_vocacional } from './tables/database-table-preguntas_vocacional';
import { pt_respuestas } from './tables/database-table-pt_respuestas';
import { pv_respuestas } from './tables/database-table-pv_respuestas';
import { respuestas_tecnico } from './tables/database-table-respuestas_tecnico';
import { respuestas_vocacional } from './tables/database-table-respuestas_vocacional';

export const databaseSchema = {
  examen,
  carrera,
  carrera_pt,
  carrera_pv,
  preguntas_tecnico,
  respuestas_tecnico,
  pt_respuestas,
  preguntas_vocacional,
  respuestas_vocacional,
  pv_respuestas,
};
