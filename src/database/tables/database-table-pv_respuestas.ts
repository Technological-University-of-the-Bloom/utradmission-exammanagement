import { foreignKey, pgTable, smallserial } from 'drizzle-orm/pg-core';
import { preguntas_vocacional } from './database-table-preguntas_vocacional';
import { respuestas_vocacional } from './database-table-respuestas_vocacional';

export const pv_respuestas = pgTable(
  'pv_respuestas',
  {
    id_pregunta: smallserial('id_pregunta')
      .references(() => preguntas_vocacional.id_pregunta)
      .notNull(),
    id_respuesta: smallserial('id_respuesta')
      .references(() => respuestas_vocacional.id_respuesta)
      .notNull(),
  },
  (table) => ({
    preguntaFk: foreignKey({
      name: 'id_pregunta_fk',
      columns: [table.id_pregunta],
      foreignColumns: [preguntas_vocacional.id_pregunta],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),
    respuestaFk: foreignKey({
      name: 'id_respuesta_fk',
      columns: [table.id_respuesta],
      foreignColumns: [respuestas_vocacional.id_respuesta],
    }),
  }),
);
