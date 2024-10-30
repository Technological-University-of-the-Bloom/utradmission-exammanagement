import { foreignKey, pgTable, smallserial } from 'drizzle-orm/pg-core';
import { preguntas_tecnico } from './database-table-preguntas_tecnico';
import { respuestas_tecnico } from './database-table-respuestas_tecnico';

export const pt_respuestas = pgTable(
  'pt_respuestas',
  {
    id_pregunta: smallserial('id_pregunta')
      .references(() => preguntas_tecnico.id_pregunta)
      .notNull(),
    id_respuesta: smallserial('id_respuestas')
      .references(() => respuestas_tecnico.id_respuesta)
      .notNull(),
  },
  (table) => ({
    preguntaFk: foreignKey({
      name: 'id_pregunta_fk',
      columns: [table.id_pregunta],
      foreignColumns: [preguntas_tecnico.id_pregunta],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),
    respuestaFk: foreignKey({
      name: 'id_respuesta_fk',
      columns: [table.id_respuesta],
      foreignColumns: [respuestas_tecnico.id_respuesta],
    }),
  }),
);
