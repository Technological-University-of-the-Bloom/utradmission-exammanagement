import { foreignKey, pgTable, smallint } from 'drizzle-orm/pg-core';
import { carrera } from './database-table-carrera';
import { preguntas_tecnico } from './database-table-preguntas_tecnico'; // Ensure you import the correct table

export const carrera_pt = pgTable(
  'carrera_pt',
  {
    id_carrera: smallint('id_carrera').references(() => carrera.id_carrera),
    id_pregunta: smallint('id_pregunta').references(
      () => preguntas_tecnico.id_pregunta,
    ),
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
      foreignColumns: [preguntas_tecnico.id_pregunta],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),
  }),
);
