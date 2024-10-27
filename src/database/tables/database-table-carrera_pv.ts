import { foreignKey, pgTable, smallint } from 'drizzle-orm/pg-core';
import { carrera } from './database-table-carrera';
import { preguntas_vocacional } from './database-table-preguntas_vocacional';

export const carrera_pv = pgTable(
  'carrera_pv',
  {
    id_carrera: smallint('id_carrera')
      .references(() => carrera.id_carrera)
      .notNull(),
    id_pregunta: smallint('id_pregunta')
      .references(() => preguntas_vocacional.id_pregunta)
      .notNull(),
  },
  (table) => ({
    carreraFk: foreignKey({
      name: 'id_carrera_fk',
      columns: [table.id_carrera],
      foreignColumns: [carrera.id_carrera],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),
    preguntaFk: foreignKey({
      name: 'id_pregunta_fk',
      columns: [table.id_pregunta],
      foreignColumns: [preguntas_vocacional.id_pregunta],
    }),
  }),
);
