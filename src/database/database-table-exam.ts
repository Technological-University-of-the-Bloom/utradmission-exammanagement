import {
  serial,
  real,
  date,
  interval,
  boolean,
  varchar,
  foreignKey,
  pgTable,
  smallint,
} from 'drizzle-orm/pg-core';
import { carrera } from './database-table-carrera';

export const examen = pgTable(
  'examen',
  {
    id_examen: serial('id_examen').primaryKey(),
    fecha_aplicar: date('fecha_aplicar').notNull(),
    version_examen: real('version_examen'),
    fecha_actualizada: date('fecha_actualizada'),
    fecha_creacion: date('fecha_creacion'),
    tiempo_limite: interval('tiempo_limite'),
    is_active: boolean('is_active'),
    id_carrera: smallint('id_carrera').references(() => carrera.id_carrera),
    exam_type: varchar('exam_type', { length: 255 }),
  },
  (table) => ({
    fk: foreignKey({
      name: 'id_carrera_fk',
      columns: [table.id_carrera],
      foreignColumns: [carrera.id_carrera],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),
  }),
);
